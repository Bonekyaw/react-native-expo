import * as SecureStore from "expo-secure-store";
import { API_URL } from "@/config";
import Toast from "react-native-root-toast";

async function fetchWithRetry(url: string, options: {}, retries = 5) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const res = await response.json();
      console.log(
        "Error Response in redux-------- Url is ---",
        url,
        "--- status is ---",
        res
      );

      if (response.status == 401 && res.error === "Error_AccessTokenExpired") {
        // Toast.show(res.message, {
        //   duration: Toast.durations.LONG,
        // });
        return { error: res.error };
      }

      // Error_Attack - Must Log Out

      Toast.show(res.message, { duration: Toast.durations.LONG });
      return { error: res.error };
    }
    console.log("Url is ---", url, "--- status is ---", response.status);

    return response.json();
  } catch (error) {
    if (retries > 0) {
      console.warn(`Retrying... (${retries} retries left) and url is ${url}`);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      return fetchWithRetry(url, options, retries - 1);
    } else
      Toast.show("Network request failed! Try again later.", {
        duration: Toast.durations.LONG,
      });
  }
}

async function fetchRefreshToken() {
  // const token = await SecureStore.getItemAsync("token");
  const refreshToken = await SecureStore.getItemAsync("refreshToken");
  const randToken = await SecureStore.getItemAsync("randToken");

  const url = API_URL + "refresh-token";
  const method = "POST";
  const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + "anythingisfine",
  };
  const options = {
    method,
    headers,
    body: JSON.stringify({ refreshToken: refreshToken, randToken: randToken }),
  };

  try {
    const response = await fetchWithRetry(url, options, 5);
    if (response.error) {
      return { refresh: false };
    } else {
      await SecureStore.setItemAsync("token", response.token);
      await SecureStore.setItemAsync("refreshToken", response.refreshToken);
      await SecureStore.setItemAsync("randToken", response.randToken);
    }
    return { refresh: true, newToken: response.token };
  } catch (error) {
    console.error("Failed to fetch Refresh Token: ", error || "Type error");
  }
}

export const fetchApi = async (endpoint = "", method = "GET", data = {}) => {
  const token = await SecureStore.getItemAsync("token");

  const url = API_URL + endpoint;
  const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };
  const options =
    Object.keys(data).length === 0
      ? { method, headers }
      : { method, headers, body: JSON.stringify(data) };

  try {
    const response = await fetchWithRetry(url, options, 5);
    if (response.error && response.error === "Error_AccessTokenExpired") {
      // Call Refresh Token API
      // IF successful, call again fetchWithRetry()
      // console.log("Fetching refresh token --------");

      const res = await fetchRefreshToken();
      if (res?.refresh) {
        const newToken = res.newToken;
        const newhHeaders = {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + newToken,
        };
        const newOptions =
          Object.keys(data).length === 0
            ? { method, headers: newhHeaders }
            : { method, headers: newhHeaders, body: JSON.stringify(data) };

        const resAgain = await fetchWithRetry(url, newOptions, 5);
        // console.log("Finally success --------", resAgain);

        return resAgain;
      } else {
        return { error: "Error_Attack" };
      }
    }
    return response;
  } catch (error) {
    console.error("Failed to fetch APi: ", error || "Type error");
  }
};
