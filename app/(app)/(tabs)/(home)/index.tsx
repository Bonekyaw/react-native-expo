import { useEffect, useCallback, memo } from "react";
import {
  Image,
  StyleSheet,
  Platform,
  Pressable,
  ActivityIndicator,
} from "react-native";
import Toast from "react-native-root-toast";
import { Link, useNavigation } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useSession } from "@/providers/ctx";
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import { getUsers, updateUser } from "@/providers/redux/user/userSlice";
import type { User } from "@/types";
import { Colors } from "@/constants/Colors";

const UserItem = memo(
  ({
    user,
    updateUserById,
  }: {
    user: User;
    updateUserById: (user: User) => void;
  }) => (
    <Pressable
      key={user.id}
      style={styles.userList}
      onPress={() => updateUserById({ ...user })}
    >
      <ThemedText>{user.name}</ThemedText>
    </Pressable>
  )
);

export default function HomeScreen() {
  const navigation = useNavigation();
  const { signOut } = useSession();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      getAllUsers();
    }, [])
  );

  const dispatch = useAppDispatch();
  const { users, isFetching } = useAppSelector((state) => state.users);

  const getAllUsers = useCallback(async () => {
    try {
      await dispatch(getUsers()).unwrap();
    } catch (error: any) {
      if (error === "Error_Attack") {
        // Error_Attack - Must Log Out
        Toast.show("Long time no see. Please Login again.", {
          duration: Toast.durations.LONG,
        });
        signOut();
      } else Toast.show(error, { duration: Toast.durations.LONG });
    }
  }, []);

  const updateUserById = useCallback(async ({ id, name }: User) => {
    try {
      const user = { id, name: name + new Date().getSeconds() };
      await dispatch(updateUser(user)).unwrap();
    } catch (error: any) {
      if (error === "Error_Attack") {
        // Error_Attack - Must Log Out
        Toast.show("Long time no see. Please Login again.", {
          duration: Toast.durations.LONG,
        });
        signOut();
      } else Toast.show(error, { duration: Toast.durations.LONG });
    }
  }, []);

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
        <ThemedText type="subtitle">User List</ThemedText>
        <ThemedText type="default">
          Fetched by createAsyncThunk & createSlice
        </ThemedText>
        <Link href="/normalize" style={styles.btn}>
          Press here to learn createEntityAdapter
        </Link>
        {users && users.length > 0 ? (
          users.map((user) => (
            <UserItem
              key={user.id}
              user={user}
              updateUserById={updateUserById}
            />
          ))
        ) : isFetching ? (
          <ActivityIndicator size="small" color="#00ff00" />
        ) : (
          <ThemedText>No User Found </ThemedText>
        )}
        <Pressable onPress={signOut} style={styles.logout}>
          <ThemedText>Log Out</ThemedText>
        </Pressable>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    // flexDirection: "row",
    alignItems: "center",
    gap: 11,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  btn: {
    width: "90%",
    backgroundColor: Colors.ownLight,
    borderRadius: 7,
    paddingVertical: 11,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  userList: {
    marginVertical: 3,
    borderColor: Colors.own,
    borderWidth: 1,
    width: "80%",
    paddingVertical: 7,
    paddingHorizontal: 17,
  },
  logout: {
    borderColor: Colors.ownLight,
    borderWidth: 1,
    paddingVertical: 7,
    paddingHorizontal: 17,
    borderRadius: 7,
    marginTop: 7,
  },
});
