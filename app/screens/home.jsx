import { router } from "expo-router";
import { signOut } from "firebase/auth";
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { useTransactions } from "../contexts/TransactionContext"; // Changed from useContext import
import { auth } from "../utils/firebase";

export default function HomeScreen() {
  const { user } = useAuth();
  const { transactions, loading } = useTransactions(); // Now using the hook

  const handleLogout = () => {
    signOut(auth).then(() => router.replace("/login"));
  };

  const handlePressItem = (id) => {
    router.push({
      pathname: "/edit-transaction",
      params: { id },
    });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome {user?.email}</Text>
      <Button title="Log Out" onPress={handleLogout} />
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => handlePressItem(item.id)}>
            <View>
              <Text style={styles.name}>{item.description || "No description"}</Text>
              <Text style={styles.category}>{item.category}</Text>
            </View>
            <Text style={[styles.amount, item.type === "income" ? styles.income : styles.expense]}>
              ${item.amount.toFixed(2)}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No transactions yet</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50, backgroundColor: "#111" },
  title: { fontSize: 24, color: "#fff", marginBottom: 20 },
  item: {
    backgroundColor: "#222",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: { fontSize: 18, color: "#eee" },
  category: { fontSize: 14, color: "#aaa", marginTop: 4 },
  amount: { fontSize: 16 },
  income: { color: "#4caf50" },
  expense: { color: "#f44336" },
  empty: { color: "#aaa", textAlign: "center", marginTop: 20 },
});
