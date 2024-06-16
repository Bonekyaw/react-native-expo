import { router } from "expo-router";
import { StyleSheet, TextInput, Button, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";

import { useSession } from "@/providers/SessionProvider";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function Login() {
  const { signIn } = useSession();

  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: "",
      password: "",
    },
  });
  const onSubmit = (data: any) => {
    console.log(data);
    signIn();
    // Navigate after signing in. You may want to tweak this to ensure sign-in is
    // successful before navigating.
    router.replace("/");
  };

  const onChange = (arg: any) => {
    return {
      value: arg.nativeEvent.text,
    };
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.label}>
          Phone Number
        </ThemedText>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="0977******7"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              inputMode="numeric"
              maxLength={12}
              accessibilityLabel="inputLabel"
              accessibilityHint="inputError"
            />
          )}
          name="phone"
          rules={{ required: true, minLength: 7 }}
        />
        {errors.phone && (
          <ThemedText style={styles.errorText}>
            Invalid Phone Number!
          </ThemedText>
        )}
        <ThemedText style={styles.label}>
          Password{" "}
          <ThemedText style={styles.hintText}>( Must be 8 digits. )</ThemedText>
        </ThemedText>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="********"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              inputMode="numeric"
              maxLength={8}
              secureTextEntry
              accessibilityLabel="inputLabel"
              accessibilityHint="inputError"
            />
          )}
          name="password"
          rules={{ required: true, minLength: 8 }}
        />
        {errors.password && (
          <ThemedText style={styles.errorText}>Invalid Password!</ThemedText>
        )}
        <ThemedView style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
            <ThemedText style={styles.buttonText}>Login</ThemedText>
          </Pressable>
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: 16,
    height: "100%",
  },
  label: {
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#F1F5F9",
    color: "#000",
    fontSize: 14,
    padding: 8,
    borderRadius: 4,
  },
  hintText: {
    fontSize: 12,
    color: "#6B7280",
  },
  errorText: {
    paddingTop: 8,
    fontWeight: "bold",
    color: "#EF4444",
  },
  buttonContainer: {
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
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
    marginHorizontal: 40,
    fontSize: 16,
  },
});
