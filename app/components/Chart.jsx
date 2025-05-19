import { useContext } from "react";
import { Dimensions, View } from "react-native";
import { VictoryPie } from "victory-native";
import { TransactionContext } from "../contexts/TransactionContext";

export default function Chart() {
  const { transactions } = useContext(TransactionContext);

  const expenseData = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => {
      const found = acc.find((d) => d.x === t.category);
      if (found) {
        found.y += t.amount;
      } else {
        acc.push({ x: t.category, y: t.amount });
      }
      return acc;
    }, []);

  if (expenseData.length === 0) return null;

  return (
    <View style={{ alignItems: "center" }}>
      <VictoryPie
        data={expenseData}
        colorScale="qualitative"
        width={Dimensions.get("window").width * 0.9}
        height={250}
        labels={({ datum }) => `${datum.x}\n$${datum.y.toFixed(2)}`}
        style={{
          labels: { fill: "#eee", fontSize: 14 },
        }}
      />
    </View>
  );
}
