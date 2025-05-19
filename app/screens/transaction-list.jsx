import { useContext, useState } from "react";
import { FlatList, Picker, StyleSheet, Text, View } from "react-native";
import TransactionItem from "../components/TransactionItem";
import { TransactionContext } from "../contexts/TransactionContext";

export default function TransactionListScreen() {
  const { transactions } = useContext(TransactionContext);
  const [monthFilter, setMonthFilter] = useState("all");

  const filteredTransactions =
    monthFilter === "all"
      ? transactions
      : transactions.filter((t) => {
          const transactionMonth = new Date(t.date).getMonth() + 1;
          return transactionMonth === parseInt(monthFilter);
        });

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={monthFilter}
        onValueChange={setMonthFilter}
        style={styles.picker}
        mode="dropdown"
      >
        <Picker.Item label="All Months" value="all" />
        {[...Array(12)].map((_, i) => (
          <Picker.Item
            key={i + 1}
            label={new Date(0, i).toLocaleString("default", { month: "long" })}
            value={(i + 1).toString()}
          />
        ))}
      </Picker>
      {filteredTransactions.length === 0 ? (
        <Text style={styles.empty}>No transactions found.</Text>
      ) : (
        <FlatList
          data={filteredTransactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionItem transaction={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111", padding: 20 },
  picker: {
    backgroundColor: "#222",
    color: "#eee",
    marginBottom: 15,
  },
  empty: { color: "#aaa", textAlign: "center", marginTop: 20 },
});
