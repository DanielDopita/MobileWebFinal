import DateTimePicker from "@react-native-community/datetimepicker";
import { useContext, useState } from "react";
import {
    Button,
    Picker,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { TransactionContext } from "../contexts/TransactionContext";

export default function AddTransactionScreen({ navigation }) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("expense");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { addTransaction } = useContext(TransactionContext);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

const validate = () => {
  if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
    Alert.alert('Error', 'Please enter a valid positive amount');
    return false;
  }
  if (!category) {
    Alert.alert('Error', 'Please select a category');
    return false;
  }
  return true;
};

  const handleSubmit = () => {
    if (!validate()) return;
    if (!amount || isNaN(amount)) return;
    addTransaction({
      amount: parseFloat(amount),
      description,
      category,
      type,
      date: date.toISOString(),
    });
    navigation.goBack();
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
      <Button title="Add Transaction" onPress={handleSubmit} />
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
