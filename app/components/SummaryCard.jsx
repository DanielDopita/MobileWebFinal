import { StyleSheet, Text, View } from "react-native";

export default function SummaryCard({ title, amount, color }) {
  return (
    <View style={[styles.card, { backgroundColor: color }]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.amount}>${amount.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  title: {
    color: "#ccc",
    fontSize: 16,
    marginBottom: 8,
  },
  amount: {
    color: "#eee",
    fontSize: 24,
    fontWeight: "bold",
  },
});
