import React, { useCallback, memo } from "react";
import { StyleSheet, ActivityIndicator, Pressable } from "react-native";
import { Link, Stack } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";

import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import {
  useGetUsersQuery,
  useUpdateUserMutation,
} from "@/providers/redux/user/rtkSlice";
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

const Rtk = () => {
  const {
    data: users,
    isLoading: usersLoading,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetUsersQuery();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const updateUserClick = useCallback(async (user: User) => {
    try {
      await updateUser({
        id: user.id,
        name: user.name + new Date().getSeconds(),
      }).unwrap();
    } catch (error) {
      console.error("Failed to save the user", error);
    }
  }, []);

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: "RTK Query",
          headerBackTitle: "Normalize",
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
      <ThemedText style={styles.title}>User List</ThemedText>
      {users && users.length > 0 ? (
        users.map((user) => (
          <UserItem
            key={user.id}
            user={user}
            updateUserById={updateUserClick}
          />
        ))
      ) : usersLoading ? (
        <ActivityIndicator size="small" color="#00ff00" />
      ) : (
        <ThemedText>No User Found</ThemedText>
      )}
      <Link href="/rtkEntity" style={styles.btn}>
        RTK Query with createEntityAdapter
      </Link>
    </ThemedView>
  );
};

export default Rtk;

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
