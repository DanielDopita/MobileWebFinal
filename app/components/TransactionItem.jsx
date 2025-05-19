import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TransactionItem({ transaction }) {
  const navigation = useNavigation();
  const { amount, category, date, description, type, id } = transaction;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        type === "income" ? styles.income : styles.expense,
      ]}
      onPress={() => navigation.navigate("EditTransaction", { id })}
    >
      <View style={styles.left}>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.category}>{category}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.amount}>
          {type === "income" ? "+" : "-"}${amount.toFixed(2)}
        </Text>
        <Text style={styles.date}>{new Date(date).toLocaleDateString()}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginVertical: 6,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  income: { backgroundColor: "#1e4620" },
  expense: { backgroundColor: "#4a1f1f" },
  left: { flex: 1 },
  right: { alignItems: "flex-end" },
  description: { color: "#eee", fontWeight: "600", fontSize: 16 },
  category: { color: "#aaa", marginTop: 3 },
  amount: { color: "#eee", fontWeight: "700", fontSize: 16 },
  date: { color: "#aaa", marginTop: 3 },
});
