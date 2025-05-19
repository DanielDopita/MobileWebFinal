export default function Layout() {
  return (
    <AuthProvider>
      <TransactionProvider>
        <Stack screenOptions={{ headerShown: false }}>
          {/* No need to declare screens here if using file-based routing */}
        </Stack>
      </TransactionProvider>
    </AuthProvider>
  );
}