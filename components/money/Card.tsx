import React from "react";
import { StyleSheet, Pressable } from "react-native";
// import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

type ItemProps = {
  name: string;
  email: string;
  company: string;
  phone: string;
  onSave: Function;
};

const Card = ({ name, email, company, phone, onSave }: ItemProps) => {
    // const router = useRouter();

  return (
    <ThemedView style={styles.card}>
      <Pressable onPress={() => onSave()}>
        <ThemedView style={styles.row}>
          <MaterialIcons name="account-circle" size={80} color="#3ac1c5" />
          <ThemedView style={styles.content}>
            <ThemedText style={styles.name}>{name}</ThemedText>
            <ThemedText style={styles.info}>{email}</ThemedText>
            <ThemedText style={styles.info}>{company}</ThemedText>
            <ThemedText style={styles.info}>{phone}</ThemedText>
          </ThemedView>
        </ThemedView>
      </Pressable>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 170,
    borderRadius: 8,
    borderWidth: 0.2,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginTop: 3,
    marginBottom: 4,
    overflow: "hidden",
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  content: {
    paddingTop: 17,
    marginLeft: 15,
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  info: {
    fontSize: 14,
    color: "gray",
    marginBottom: 2,
  },
});

export default Card;
