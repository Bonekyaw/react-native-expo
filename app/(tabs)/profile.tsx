import { useState } from "react";
import { StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import QueryScreen from "@/providers/graphql/sample/query";
import MutationScreen from "@/providers/graphql/sample/mutation";

export default function ProfileScreen() {
  const [graphql, setGraphql] = useState("");

  let SelectedScreen =
    graphql === "query" ? (
      <QueryScreen />
    ) : graphql === "mutation" ? (
      <MutationScreen />
    ) : null;

  return (
    <SafeAreaView style={styles.container}>
      <ThemedText
        type="subtitle"
        style={{
          backgroundColor: "#3ac1c5",
          paddingHorizontal: 50,
          paddingVertical: 5,
        }}
      >
        Graphql API
      </ThemedText>

      {graphql !== "query" && (
        <Pressable style={styles.button} onPress={() => setGraphql("query")}>
          <ThemedText style={styles.buttonText}>See graphql query</ThemedText>
        </Pressable>
      )}
      {graphql !== "mutation" && (
        <Pressable style={styles.button} onPress={() => setGraphql("mutation")}>
          <ThemedText style={styles.buttonText}>
            See graphql mutation
          </ThemedText>
        </Pressable>
      )}
      <Pressable style={styles.button} onPress={() => setGraphql("")}>
        <ThemedText style={styles.buttonText}>Reset To Profile</ThemedText>
      </Pressable>
      {SelectedScreen}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  button: {
    marginTop: 10,
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
    fontSize: 16,
  },
});
