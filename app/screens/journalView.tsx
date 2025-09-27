import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function JournalDetail() {
  const { day, date, expression, title, description } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.day}>{day}</Text>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.expression}>{expression}</Text>
        </View>

        <Text style={styles.title}>{title}</Text>

        <Text style={styles.description}>{description}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F2E4CB", // warm background
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  day: {
    fontSize: 18,
    fontWeight: "500",
    color: "#663300",
  },
  date: {
    fontSize: 28,
    fontWeight: "700",
    color: "#663300",
  },
  expression: {
    fontSize: 28,
    marginLeft: "auto",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#663300",
    marginBottom: 15,
  },
  description: {
    fontSize: 18,
    lineHeight: 26,
    color: "#5a3d2e",
  },
});
