import { useEffect } from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack, Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";

import { Provider } from "react-redux";
import { store } from "@/providers/redux/store";

import { ApolloProvider } from "@apollo/client";
import apolloClient from "@/providers/graphql/ApolloClient";

import { useColorScheme } from "@/hooks/useColorScheme";
import { SessionProvider } from "@/providers/SessionProvider";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const client = new QueryClient();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <QueryClientProvider client={client}>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <SessionProvider>
              <Slot />
            </SessionProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </ApolloProvider>
    </Provider>
  );
}
