import { Image, StyleSheet, Pressable } from "react-native";

import { useSession } from "@/providers/SessionProvider";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  const { signOut } = useSession();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedText style={{ marginTop: 20 }}>Now you see this Home screen 
        because you logged in successfully. Visit other screens. Or you can test 
        to learn how authentication works.
      </ThemedText>
      <Pressable style={styles.button} onPress={signOut}>
        <ThemedText style={styles.buttonText}>Log Out</ThemedText>
      </Pressable>
      <ThemedText style={styles.buttonText}>Please give me a Github star if you find this Starter Kits useful.</ThemedText>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  button: {
    marginVertical: 30,
    width: "60%",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    // elevation: 3, // For Android shadow
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
  },
});
