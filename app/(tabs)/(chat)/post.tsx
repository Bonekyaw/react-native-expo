import {
  Pressable,
  RefreshControl,
  FlatList,
  StyleSheet,
  Animated,
} from "react-native";
import React from "react";
import { useRouter, Stack } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { useColorScheme } from "@/hooks/useColorScheme";

import { useAppDispatch } from "@/hooks/useRedux";
import { setUser } from "@/providers/redux/userSlice";
import { useGetListQuery } from "@/providers/redux/query/apiSlice";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import Card from "@/components/money/Card";

export default function Post() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useGetListQuery("users");

  const opacity = React.useRef(new Animated.Value(0.3)).current;
  React.useEffect(() => {
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

  if (isLoading) {
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

  const saveUserInRedux = (item: any) => {
    dispatch(setUser(item));
    router.push("(tabs)/(chat)/detail");
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          headerBackTitle: "chat",
          headerTitle: "RTK Query",
          headerRight: () => (
            <Pressable onPress={() => router.navigate("../profile")}>
              <TabBarIcon
                name="notifications-outline"
                size={24}
                color={colorScheme === "dark" ? "white" : "black"}
              />
            </Pressable>
          ),
        }}
      />

      <ThemedView style={styles.innerContainer}>
        <FlashList
          data={data}
          renderItem={({ item }: any) => (
            <Card
              name={item.name}
              email={item.email}
              company={item.company.name}
              phone={item.phone}
              onSave={() => saveUserInRedux(item)}
            />
          )}
          estimatedItemSize={200}
          //   keyboardDismissMode="on-drag"
          //   ListFooterComponent={<Text>Loading...</Text>}
          //   numColumns={2}
          //   contentContainerStyle={{ gap: 5, padding: 5 }}
          //   columnWrapperStyle={{ gap: 5 }}
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    minHeight: 200,
    // backgroundColor: "#f0f1f0",
  },
  containerSkeleton: {
    flex: 1,
    marginHorizontal: 8,
  },
  skeletonItem: {
    width: "95%",
    height: 150,
    borderRadius: 10,
    backgroundColor: "#E0E0E0",
    marginVertical: 2,
  },
});
