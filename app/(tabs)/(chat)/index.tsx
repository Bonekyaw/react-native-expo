import React, { useRef, useEffect } from "react";
import { StyleSheet, Pressable } from "react-native";
import { useRouter, Link, useNavigation } from "expo-router";
import LottieView from "lottie-react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function ChatScreen() {
  const animation = useRef(null);
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  // useEffect(() => {
  //   // You can control the ref programmatically, rather than using autoPlay
  //   animation.current?.play();
  // }, []);

  return (
    <ThemedView style={styles.container}>
      <LottieView
        autoPlay
        ref={animation}
        style={styles.lottie}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("@/assets/images/love.json")}
      />
      <ThemedText style={styles.baseText}>This is Lottie Animation.</ThemedText>
      <ThemedText style={styles.smallText}>
        This section is about redux-toolkit & RTK query.
      </ThemedText>
      <Pressable
        style={styles.button}
        onPress={() => router.push("(tabs)/(chat)/post")}
      >
        <ThemedText style={styles.buttonText}>
          Click to see how to call API
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    width: 200,
    height: 200,
  },
  baseText: {
    fontSize: 16,
  },
  smallText: {
    padding: 20,
    fontSize: 14,
  },
  button: {
    alignSelf: "center",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    // elevation: 1, // For Android shadow
  },
  buttonText: {
    fontSize: 16,
  },
});
