import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { router } from "expo-router";
import { Image } from "expo-image";

import { useSession } from "@/providers/ctx";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function Login() {
  const { signIn } = useSession();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (formState: any) => {
    // console.log(formState);
    await signIn(formState);
    // Navigate after signing in. You may want to tweak this to ensure sign-in is
    // successful before navigating.
    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.row}>
          <Image
            source={require("@/assets/images/react-logo.png")}
            placeholder={{ blurhash }}
            style={styles.logo}
            contentFit="cover"
            transition={1000}
          />
          <Text style={styles.logoText}>Fashion</Text>
        </View>
        <Text style={styles.title}>Sign in {"\n"}to your Account</Text>
        <Text style={styles.subTitle}>
          Enter your name & password to log in
        </Text>
        <Text style={[styles.subTitle, styles.label]}>Phone Number</Text>
        <Controller
          control={control}
          rules={{
            required: true,
            minLength: 7,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="0977*******7"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              inputMode="numeric"
              maxLength={12}
            />
          )}
          name="phone"
        />
        {errors.phone && (
          <Text style={styles.errorText}>This is required.</Text>
        )}
        <Text style={[styles.subTitle, styles.label]}>
          Password ( Must be 8 digits. )
        </Text>
        <Controller
          control={control}
          rules={{
            required: true,
            minLength: 8,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="*********"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              inputMode="numeric"
              maxLength={8}
              secureTextEntry
            />
          )}
          name="password"
        />
        {errors.password && (
          <Text style={styles.errorText}>Password is invalid.</Text>
        )}
        <Text style={styles.forgotText}>Forgot Password?</Text>
        <Pressable
          onPress={handleSubmit(onSubmit)}
          style={[styles.input, { backgroundColor: "#2772DA" }]}
        >
          <Text style={styles.btnText}>Log In</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 5,
    marginTop: 12,
  },
  logo: { width: 20, height: 20 },
  logoText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    lineHeight: 46,
  },
  subTitle: {
    marginTop: 12,
    fontWeight: "700",
    color: "gray",
  },
  label: {
    marginTop: 27,
    marginBottom: 7,
  },
  input: {
    backgroundColor: "white",
    color: "black",
    borderWidth: 0.5,
    borderColor: "#8c8c8c55",
    fontSize: 15,
    paddingVertical: 17,
    paddingHorizontal: 15,
    borderRadius: 9,
  },
  forgotText: {
    marginTop: 15,
    marginBottom: 25,
    fontWeight: "700",
    color: "#2772DA",
    textAlign: "right",
  },
  btnText: {
    color: "white",
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
  },
  errorText: {
    paddingTop: 8,
    fontWeight: "bold",
    color: "#EF4444",
  },
});
