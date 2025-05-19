import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { auth, firestore } from "../utils/firebase"; // Import firestore instead of db

export const TransactionContext = createContext();

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        setLoading(false);
      } else {
        setUserId(null);
        setTransactions([]);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!userId) return;

    setLoading(true);
    try {
      const transactionsRef = collection(firestore, "transactions"); // Use firestore here
      const q = query(
        transactionsRef,
        where("userId", "==", userId)
      );

      const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
        const trans = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTransactions(trans);
        setLoading(false);
      });

      return () => unsubscribeSnapshot();
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setLoading(false);
    }
  }, [userId]);

  const addTransaction = async (transaction) => {
    if (!userId) return;
    try {
      await addDoc(collection(firestore, "transactions"), {
        ...transaction,
        userId,
      });
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const updateTransaction = async (id, updated) => {
    try {
      await updateDoc(doc(firestore, "transactions", id), updated);
    } catch (error) {
      console.error("Error updating transaction:", error);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await deleteDoc(doc(firestore, "transactions", id));
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        loading,
        addTransaction,
        updateTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export default function useTransactions() {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
}