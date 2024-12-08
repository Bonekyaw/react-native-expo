import { StyleSheet, FlatList } from "react-native";

import { useQuery, gql } from "@apollo/client";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const paginate = gql`
  query PaginateAdmins($limit: Int!, $page: Int!) {
    paginateAdmins(limit: $limit, page: $page) {
      total
      data {
        _id
        name
        phone
        role
        status
        lastLogin
        profile
        createdAt
      }
      pageInfo {
        currentPage
        previousPage
        nextPage
        lastPage
        countPerPage
        nextCursor
        hasNextPage
      }
    }
  }
`;

export default function QueryScreen() {
  // Hey, you can save token in global state or secure store after login.
  // And then it can be taken anywhere.

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NGM3MmVmOWRjOTI5NDI1ZDg1NjdiMSIsImlhdCI6MTcxODUxNjQ0NywiZXhwIjoxNzE4NTIwMDQ3fQ.vrIeajcYNk4KueR4roK78f2Bc_yqYjfR9eIXtYg7Ht8";

  const { loading, error, data } = useQuery(paginate, {
    variables: { limit: 3, page: 1 },
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  if (error) {
    return (
      <ThemedText style={{ marginTop: 200 }}>Failed to fetch data</ThemedText>
    );
  }
  if (loading) {
    return <ThemedText style={{ marginTop: 200 }}>Loading...</ThemedText>;
  }

  const Item = ({ item }: any) => (
    <ThemedView style={{ marginTop: 40 }}>
      <ThemedText style={styles.marginTop5}>ID : {item._id}</ThemedText>
      <ThemedText style={styles.marginTop5}>Phone : {item.phone}</ThemedText>
      <ThemedText style={styles.marginTop5}>Role : {item.role}</ThemedText>
      <ThemedText style={styles.marginTop5}>
        ----------------------------
      </ThemedText>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      {data && (
        <FlatList
          data={data.paginateAdmins.data}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={(item) => item._id}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  marginTop5: {
    marginTop: 15,
  },
});
