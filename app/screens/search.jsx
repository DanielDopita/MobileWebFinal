import { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import TransactionItem from "../components/TransactionItem";
import { TransactionContext } from "../contexts/TransactionContext";

export default function SearchScreen() {
  const { transactions } = useContext(TransactionContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFiltered(transactions);
      return;
    }
    const lowerTerm = searchTerm.toLowerCase();
    setFiltered(
      transactions.filter(
        (t) =>
          t.description.toLowerCase().includes(lowerTerm) ||
          t.category.toLowerCase().includes(lowerTerm) ||
          t.amount.toString().includes(lowerTerm)
      )
    );
  }, [searchTerm, transactions]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search by description, category, or amount"
        style={styles.input}
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransactionItem transaction={item} />}
        ListEmptyComponent={<Text style={styles.empty}>No results found</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#111" },
  input: {
    backgroundColor: "#222",
    color: "#eee",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  empty: { color: "#aaa", textAlign: "center", marginTop: 20 },
});
