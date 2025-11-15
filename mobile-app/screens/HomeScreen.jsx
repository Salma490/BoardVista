import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to BoardVista</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("PostBoarding")}>
        <Text style={styles.btnText}>Post Boarding</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Recommendations")}>
        <Text style={styles.btnText}>View Recommendations</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("NearbyServices")}>
        <Text style={styles.btnText}>Nearby Services</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("OwnerDashboard")}>
        <Text style={styles.btnText}>Owner Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  button: { backgroundColor: "#007AFF", padding: 12, borderRadius: 8, width: "80%", marginVertical: 8 },
  btnText: { color: "#fff", textAlign: "center" },
});
