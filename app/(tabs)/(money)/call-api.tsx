import {
  Pressable,
  RefreshControl,
  FlatList,
  StyleSheet,
  Animated,
} from "react-native";
import React from "react";
import { useRouter, Stack } from "expo-router";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { FlashList } from "@shopify/flash-list";
import { useColorScheme } from "@/hooks/useColorScheme";

import { fetchApi } from "@/api/fetch";
import { useRefreshByUser } from "@/hooks/useRefreshByUser";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import Card from "@/components/money/Card";

export default function CallApi() {
  const router = useRouter();
  const colorScheme = useColorScheme();

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

  const {
    isPending,
    error,
    data: users,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchApi("users", "GET", ""),
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);
  useRefreshOnFocus(refetch);

  // Hey, Have a look! This is for infinite loading aka "Load more".
  // Starting

  //   const {
  //     data,
  //     error,
  //     fetchNextPage,
  //     hasNextPage,
  //     isFetching,
  //     isFetchingNextPage,
  //     status,
  //   } = useInfiniteQuery({
  //     queryKey: ["posts"],
  //     queryFn: () => fetchApi(`posts?page=${pageNumber}`, "GET", token),     // fetchApi(`posts?cursor=${nextCursor}`, "GET", token),
  //     initialPageParam: 1,
  //     getNextPageParam: (lastPage, pages) => pages.length + 1,   // lastPage.nextCursor,
  //   });

  //   if (status === 'pending') {
  //        return <ThemedText>Loading...</ThemedText>;
  //   }

  //   if (status === 'error') {
  //     return <ThemedText>Error: {error.message}</ThemedText>;
  //   }

  //   <Button
  //   variant="outline"
  //   size="lg"
  //   disabled={!hasNextPage || isFetchingNextPage}
  //   onPress={() => mutation.mutate()}
  //    >
  //   <ThemedText>
  //     {isFetchingNextPage
  //        ? 'Loading more...'
  //        : hasNextPage
  //        ? 'Load More'
  //        : 'Nothing more to load'}
  //   </ThemedText>
  // </Button>
  // <ThemedText>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</ThemedText>

  // End

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

  const saveUserInRedux = (item: any) => {
    router.push(`/${item.id}`);
  }

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          headerBackTitle: "money",
          headerTitle: "React Query",
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
          data={users}
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
          refreshControl={
            <RefreshControl
              refreshing={isRefetchingByUser}
              onRefresh={refetchByUser}
            />
          }
          //   keyboardDismissMode="on-drag"
          //   ListFooterComponent={<Text>Loading...</Text>}
          //   numColumns={2}
          //   contentContainerStyle={{ gap: 5, padding: 5 }}
          //   columnWrapperStyle={{ gap: 5 }}
          //   onEndReached={() => {
          //     fetchNextPage();
          //   }}
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
