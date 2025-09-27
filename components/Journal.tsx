import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface JournalInt {
  day: string;
  date: string;
  expression: string;
  title: string;
  description: string;
}

export default function JournalRender({
  day,
  date,
  expression,
  title,
  description,
}: JournalInt) {
  console.log({ day, date, expression, title, description });

  const safeDescription = typeof description === "string" ? description : "";

  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/screens/journalView",
          params: {
            day: day,
            date: date,
            expression: expression,
            title: title,
            description: description,
          },
        })
      }
    >
      <View style={styles.journal}>
        <View style={styles.metaDataBox}>
          <Text style={styles.day}> {day} </Text>
          <Text style={styles.date}> {date} </Text>
          <Text style={styles.expression}> {expression} </Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.journalTitle}> {title} </Text>
          <Text style={styles.journalDesc}>
            {safeDescription.slice(0, 85) +
              (safeDescription.length > 85 ? "..." : "")}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  journal: {
    flexDirection: "row",
    gap: 18,
    padding: 10,
    backgroundColor: "#D3DFF0",
    marginHorizontal: 20,
    borderRadius: 10,
  },

  metaDataBox: {
    backgroundColor: "#ffffff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  infoBox: {
    flex: 1,
    flexDirection: "column",
    gap: 2,
  },

  journalTitle: {
    color: "#663300",
    fontSize: 17,
    fontWeight: "500",
  },

  journalDesc: {
    color: "#663300",
    fontSize: 14,
    fontWeight: "400",
    flexShrink: 1,
  },

  day: {
    color: "#663300",
    fontSize: 17,
  },

  date: {
    color: "#663300",
    fontSize: 24,
    fontWeight: 500,
  },

  expression: {
    position: "absolute",
    fontSize: 24,
    right: -12,
    top: -10,
  },
});
