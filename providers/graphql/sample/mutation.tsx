import { StyleSheet, Pressable } from "react-native";

import { gql, useMutation } from "@apollo/client";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const register = gql`
  mutation Register($phone: String!) {
    register(phone: $phone) {
      message
      phone
      token
    }
  }
`;

export default function MutationScreen() {
  const [registerByPhone, { data, loading, error, reset }] =
    useMutation(register);

  if (error) {
    return (
      <ThemedText style={{ marginTop: 200 }}>Failed to fetch data</ThemedText>
    );
  }
  if (loading) {
    return <ThemedText style={{ marginTop: 200 }}>Loading...</ThemedText>;
  }

  return (
    <ThemedView style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => registerByPhone({ variables: { phone: "09778661235" } })}
      >
        <ThemedText style={styles.buttonText}>
          Click To Call graphql API
        </ThemedText>
      </Pressable>

      {data && (
        <ThemedView>
          <ThemedText style={styles.marginTop15}>
            Message : {data.register.message}
          </ThemedText>
          <ThemedText style={styles.marginTop15}>
            Phone : {data.register.phone}
          </ThemedText>
          <ThemedText style={styles.marginTop15}>
            Token : {data.register.token}
          </ThemedText>
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  button: {
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
  marginTop15: {
    marginTop: 15,
  },
});
