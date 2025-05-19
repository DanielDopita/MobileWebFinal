import DateTimePicker from "@react-native-community/datetimepicker";
import { useContext, useEffect, useState } from "react";
import {
    Alert,
    Button,
    Picker,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { TransactionContext } from "../contexts/TransactionContext";

export default function EditTransactionScreen({ route, navigation }) {
  const { id } = route.params;
  const { transactions, updateTransaction, deleteTransaction } = useContext(TransactionContext);

  const transaction = transactions.find((t) => t.id === id);

  const [amount, setAmount] = useState(transaction ? transaction.amount.toString() : "");
  const [description, setDescription] = useState(transaction ? transaction.description : "");
  const [category, setCategory] = useState(transaction ? transaction.category : "");
  const [type, setType] = useState(transaction ? transaction.type : "expense");
  const [date, setDate] = useState(transaction ? new Date(transaction.date) : new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (!transaction) navigation.goBack();
  }, [transaction]);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const handleSave = () => {
    if (!amount || isNaN(amount)) {
      Alert.alert("Invalid amount");
      return;
    }
    updateTransaction(id, {
      amount: parseFloat(amount),
      description,
      category,
      type,
      date: date.toISOString(),
    });
    navigation.goBack();
  };

  const handleDelete = () => {
    Alert.alert("Confirm Delete", "Are you sure you want to delete this transaction?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: () => {
          deleteTransaction(id);
          navigation.goBack();
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <Text style={styles.label}>Description</Text>
      <TextInput style={styles.input} value={description} onChangeText={setDescription} />
      <Text style={styles.label}>Category</Text>
      <TextInput style={styles.input} value={category} onChangeText={setCategory} />
      <Text style={styles.label}>Type</Text>
      <Picker selectedValue={type} onValueChange={setType} style={styles.picker}>
        <Picker.Item label="Expense" value="expense" />
        <Picker.Item label="Income" value="income" />
      </Picker>
      <Text style={styles.label}>Date</Text>
      <Button title={date.toDateString()} onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker value={date} mode="date" display="default" onChange={onChangeDate} />
      )}
      <Button title="Save Changes" onPress={handleSave} />
      <View style={{ marginTop: 20 }}>
        <Button title="Delete Transaction" color="red" onPress={handleDelete} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#111" },
  label: { color: "#eee", marginBottom: 5, marginTop: 15 },
  input: {
    backgroundColor: "#222",
    color: "#eee",
    padding: 10,
    borderRadius: 8,
  },
  picker: {
    color: "#eee",
    backgroundColor: "#222",
  },
});
