import { Button, StyleSheet, Animated, Pressable } from "react-native";
import React, { useEffect, useRef } from "react";
import { Stack } from "expo-router";

import { useAppSelector } from "@/hooks/useRedux";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function UserDetail() {
  const user = useAppSelector((state) => state.users.user);

  const opacity = useRef(new Animated.Value(0.3)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacity]);

  const Skeleton = () => {
    return (
      <ThemedView style={styles.containerSkeleton}>
        <Animated.View style={[styles.skeletonItem, { opacity }]} />
        <Animated.View style={[styles.skeletonItem, { opacity }]} />
        <Animated.View style={[styles.skeletonItem, { opacity }]} />
      </ThemedView>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          headerBackTitle: "query",
          headerTitle: user?.name,
        }}
      />
      {user ? (
        <ThemedView
          style={{
            flex: 1,
            flexDirection: "row",
            marginTop: 15,
            paddingLeft: 40,
          }}
        >
          <ThemedView>
            <ThemedText style={styles.marginTop30}>ID</ThemedText>
            <ThemedText style={styles.marginTop30}>Name</ThemedText>
            <ThemedText style={styles.marginTop30}>Email</ThemedText>
            <ThemedText style={styles.marginTop30}>Company</ThemedText>
          </ThemedView>
          <ThemedView style={{ paddingLeft: 20 }}>
            <ThemedText style={styles.marginTop30}>: {user.id}</ThemedText>
            <ThemedText style={styles.marginTop30}>: {user.name}</ThemedText>
            <ThemedText style={styles.marginTop30}>: {user.email}</ThemedText>
            <ThemedText style={styles.marginTop30}>
              : {user.company.name}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      ) : (
        <Skeleton />
      )}
      <ThemedText
        style={{
          marginHorizontal: 10,
          marginBottom: 300,
          padding: 40,
          backgroundColor: "#3ac1c5",
        }}
      >
        Hey, this user object is from redux store.
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  containerSkeleton: {
    flex: 1,
    padding: 20,
  },
  skeletonItem: {
    width: "95%",
    height: 20,
    borderRadius: 10,
    backgroundColor: "#E0E0E0",
    marginBottom: 10,
  },
  container: {
    flex: 1,
  },
  marginTop30: {
    marginTop: 15,
  },
});
