import { useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter, Link, useNavigation } from "expo-router";

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function MoneyScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      <ThemedText style={styles.titleText}>Money makes almost everything.</ThemedText>
      <Pressable
        style={styles.button}
        onPress={() => router.push("/call-api")}
      >
        <ThemedText style={styles.buttonText}>Click to see how to call API</ThemedText>
      </Pressable>
      <ThemedText style={styles.descriptionText}>
        This section is about react query and FlashList (@shopify). If you need
        to know RTK query, go to Chat.
      </ThemedText>
      <Link href="../(chat)" asChild>
        <Pressable>
          <ThemedText style={styles.linkText}>See RTK query</ThemedText>
        </Pressable>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    paddingTop: 40,
    paddingBottom: 12,
    alignSelf: "center",
    fontSize: 20,
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
  descriptionText: {
    padding: 40,
    alignSelf: "center",
    fontSize: 14,
    textAlign: "justify",
  },
  linkText: {
    paddingLeft: 40,
    color: "#2563EB", 
    fontSize: 14,
  },
});
