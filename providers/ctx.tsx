import { useContext, createContext, type PropsWithChildren } from "react";
import { useStorageState } from "@/hooks/useStorageState";
import { fetchAuthApi } from "@/api/auth";
import * as SecureStore from "expo-secure-store";

const AuthContext = createContext<{
  signIn: ({}) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  return (
    <AuthContext.Provider
      value={{
        signIn: async (formState: any) => {
          setSession("xxx"); // set session string as you like
          // Perform sign-in logic here
          // console.log("Login Data ---------", formState);
          // try {
          //   const response: any = await fetchAuthApi("login", formState); // Call Auth api
          //   if (response) {
          //     console.log("Login Response ----- ", response);

          //     // store token and user info into secure storage or mmkv
          //     setSession("xxx"); // set session string as you like
          //     await SecureStore.setItemAsync("token", response.token);
          //     await SecureStore.setItemAsync(
          //       "refreshToken",
          //       response.refreshToken
          //     );
          //     await SecureStore.setItemAsync("randToken", response.randToken);
          //   }
          // } catch (err) {
          //   console.error("Failed in ctx: ", err);
          // }
        },
        signOut: async () => {
          setSession(null);
          // try {
          //   await SecureStore.deleteItemAsync("token");
          //   await SecureStore.deleteItemAsync("refreshToken");
          //   await SecureStore.deleteItemAsync("randToken");
          //   setSession(null);
          // } catch (error) {
          //   console.error("Failed in ctx: ", error);
          // }
        },
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
