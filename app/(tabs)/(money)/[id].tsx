import { Button, StyleSheet, Animated, Pressable } from "react-native";
import React, { useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Stack,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";

import { fetchApi } from "@/api/fetch";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function UserDetail() {
  const { id } = useLocalSearchParams();
  //   const router = useRouter();
  const client = useQueryClient();
  //   const navigation = useNavigation();
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

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["user", { id }],
    queryFn: () => fetchApi(`users/${id}`, "GET", ""),
    // initialData: route.params.user,
  });

  const mutation = useMutation({
    mutationFn: () =>
      fetchApi(`users/${id}`, "PATCH", "", { name: "Phone Nyo" }),
    onSuccess: (data) => {
      //   client.invalidateQueries({ queryKey: ["user"] });
      client.setQueryData(["user", { id }], data);
    },
  });

  //   useEffect(() => {
  //     navigation.setOptions({ headerTitle: user?.name });
  //   }, [navigation, user]);

  if (isPending) {
    return (
      <ThemedView style={styles.containerSkeleton}>
        <Animated.View style={[styles.skeletonItem, { opacity }]} />
        <Animated.View style={[styles.skeletonItem, { opacity }]} />
        <Animated.View style={[styles.skeletonItem, { opacity }]} />
      </ThemedView>
    );
  }

  if (error) {
    return <ThemedText>Failed to fetch data</ThemedText>;
  }

  if (!data) return null;

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          headerBackTitle: "api",
          headerTitle: data?.name,
        }}
      />
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
          <ThemedText style={styles.marginTop30}>: {id}</ThemedText>
          <ThemedText style={styles.marginTop30}>: {data?.name}</ThemedText>
          <ThemedText style={styles.marginTop30}>: {data?.email}</ThemedText>
          <ThemedText style={styles.marginTop30}>
            : {data?.company.name}
          </ThemedText>
        </ThemedView>
      </ThemedView>
      <ThemedView style={{ flex: 1, flexGrow: 3 }}>
        <Pressable style={styles.button} onPress={() => mutation.mutate()}>
          <ThemedText style={styles.buttonText}>
            {mutation.isPending ? "Updating now ..." : "Update test"}
          </ThemedText>
        </Pressable>
        {mutation.isError && (
          <ThemedText
            style={[styles.margin5, styles.textCenter, styles.textError]}
          >
            An error occurred: {mutation.error.message}
          </ThemedText>
        )}
        {mutation.isSuccess && (
          <ThemedText
            style={[styles.margin5, styles.textCenter, styles.textSuccess]}
          >
            Updated successfully! {mutation.data.name}
          </ThemedText>
        )}
      </ThemedView>
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
  marginTop3: {
    marginTop: 8,
  },
  margin5: {
    margin: 15,
  },
  textCenter: {
    textAlign: "left",
  },
  textError: {
    color: "#F87171",
  },
  textSuccess: {
    color: "#065F46",
  },
  buttonContainer: {
    marginTop: 50,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: 30,
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
    // elevation: 3, // For Android shadow
  },
  buttonText: {
    fontSize: 16,
  },
});
