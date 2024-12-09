import React, { memo, useCallback } from "react";
import { StyleSheet, ActivityIndicator, Pressable } from "react-native";
import { Link, Stack } from "expo-router";
import Toast from "react-native-root-toast";
import { useFocusEffect } from "@react-navigation/native";

import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useSession } from "@/providers/ctx";
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import {
  getUsersEntity,
  updateUserEntity,
  selectAllUsers,
  error,
  loading,
} from "@/providers/redux/user/entitySlice";
import type { User } from "@/types";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

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

const Normalize = () => {
  const { signOut } = useSession();

  useFocusEffect(
    useCallback(() => {
      getAllUsers();
    }, [])
  );

  const dispatch = useAppDispatch();
  const users = useAppSelector(selectAllUsers);
  const isError = useAppSelector(error);
  const isLoading = useAppSelector(loading);

  const getAllUsers = useCallback(async () => {
    try {
      await dispatch(getUsersEntity()).unwrap();
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
      await dispatch(updateUserEntity(user)).unwrap();
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
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: "Entity Adapter",
          headerBackTitle: "Home",
          headerStyle: { backgroundColor: "white" },
          headerTintColor: "black",
          headerRight: () => (
            <IconSymbol
              size={28}
              name="bell.and.waveform.fill"
              color={Colors.own}
            />
          ),
        }}
      />
      <ThemedText style={styles.title}>
        Normalized by createEntityAdapter
      </ThemedText>
      {users && users.length > 0 ? (
        users.map((user) => (
          <UserItem key={user.id} user={user} updateUserById={updateUserById} />
        ))
      ) : isLoading ? (
        <ActivityIndicator size="small" color="#00ff00" />
      ) : (
        <ThemedText>No User Found</ThemedText>
      )}
      <Link href="/rtk" style={styles.btn}>
        Press here to learn RTK Query
      </Link>
    </ThemedView>
  );
};

export default Normalize;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "white",
    alignItems: "center",
  },
  title: {
    marginVertical: 17,
  },
  userList: {
    marginVertical: 7,
    borderColor: Colors.own,
    borderWidth: 1,
    width: "80%",
    paddingVertical: 7,
    paddingHorizontal: 17,
  },
  btn: {
    width: "80%",
    marginTop: 27,
    backgroundColor: Colors.ownLight,
    borderRadius: 7,
    paddingVertical: 11,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
