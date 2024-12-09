import React, { useCallback, memo } from "react";
import { StyleSheet, ActivityIndicator, Pressable } from "react-native";
import { Link, Stack } from "expo-router";

import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import {
  useGetProductsQuery,
  useUpdateProductMutation,
} from "@/providers/redux/user/rtkEntitySlice";
import type { Product } from "@/types";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const ProductItem = memo(
  ({
    product,
    updateProductById,
  }: {
    product: Product;
    updateProductById: (product: Product) => void;
  }) => (
    <Pressable
      key={product.id}
      style={styles.userList}
      onPress={() => updateProductById({ ...product })}
    >
      <ThemedText>{product.name}</ThemedText>
    </Pressable>
  )
);

const RtkEntity = () => {
  const {
    data: products,
    isLoading: productsLoading,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetProductsQuery("getProducts");

  let content;
  if (productsLoading) {
    content = <ActivityIndicator size="small" color="#00ff00" />;
  } else if (isSuccess) {
    // console.log("Products-----", products);
    if (Object.keys(products.entities).length === 0) {
      return (
        <ThemedView
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ThemedText>Data request has failed!</ThemedText>
          <Pressable style={styles.btnError} onPress={refetch}>
            <ThemedText>Try again</ThemedText>
          </Pressable>
        </ThemedView>
      );
    }

    const { ids, entities } = products; // ids : ["uuid1", "uuid2",...], entities: {"uuid1": {id: "uuid1", "name": "David22"}, ...}
    content = ids.map((productId: string) => (
      <ProductItem
        key={productId}
        product={entities[productId]}
        updateProductById={() => updateProductClick(entities[productId])}
      />
    ));
  } else if (isError) {
    content = <ThemedText>An error occurs.</ThemedText>;
  }

  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const updateProductClick = useCallback(async (product: Product) => {
    try {
      await updateProduct({
        id: product.id,
        name: product.name + new Date().getSeconds(),
      }).unwrap();
    } catch (error) {
      console.error("Failed to save the user", error);
    }
  }, []);

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: "RTKquery Entity",
          headerBackTitle: "RTK Query",
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
        RTK Query with createEntityAdapter
      </ThemedText>
      {content}
      <Link href="/rtk" style={styles.btn}>
        Press here to learn RTK Query
      </Link>
    </ThemedView>
  );
};

export default RtkEntity;

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
  btnError: {
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 5,
  },
});
