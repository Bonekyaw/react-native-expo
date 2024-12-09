import { API_URL } from "@/config";
import Toast from "react-native-root-toast";

export const fetchAuthApi = async (endpoint = "", data = {}) => {
  const url = API_URL + endpoint;
  const method = "POST";
  const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
  };
  const options = { method, headers, body: JSON.stringify(data) };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const res = await response.json();
      console.log("Error Response not ok--------", res);
      Toast.show(res.message, { duration: Toast.durations.LONG });
      return null;
    }

    return response.json();
  } catch (error: any) {
    // console.error("Failed to fetch APi: ", error);
    Toast.show("Server Error. Please try again.", {
      duration: Toast.durations.LONG,
    });
  }
};
