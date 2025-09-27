import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import JournalRender from "../../components/Journal";
import { getJournals } from "../../utils/storage";

export default function Journal() {
  const [data, setData] = useState<any[]>([]);

  const router = useRouter();

  useEffect(() => {
    async function loadJournals() {
      const loadedJournals = await getJournals();
      setData(loadedJournals ?? []);
    }

    loadJournals();
  }, []);

  function handleNewJournalButtonPress() {
    router.push("/screens/journal");
  }

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.view}>
          <Text style={styles.journalTextHeading}>my journals</Text>
          <Text style={styles.myJournalsText}>Past Journals</Text>
          <View style={styles.journalFlexView}>
            {data.length > 0 &&
              data.map((journal, index) => (
                <JournalRender
                  key={index}
                  day={journal.day}
                  date={journal.date}
                  expression={journal.expression}
                  title={journal.title}
                  description={journal.description}
                />
              ))}
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={handleNewJournalButtonPress}
          style={styles.newJournalButton}
        >
          <View>
            <AntDesign name="plus" size={24} color="white" />
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F2E4CB",
  },

  view: {
    flex: 1,
    backgroundColor: "#F2E4CB",
    marginBottom: 100,
  },

  journalTextHeading: {
    fontSize: 32,
    color: "#663300",
    marginHorizontal: "auto",
    marginTop: 70,
  },
  myJournalsText: {
    marginHorizontal: 15,
    marginTop: 40,
    marginBottom: 15,
    fontSize: 16,
    color: "#663300",
  },

  journalFlexView: {
    flexDirection: "column",
    gap: 10,
  },

  newJournalButton: {
    position: "absolute",
    bottom: 140,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#66b2ff",
  },

  noJournals: {
    fontSize: 20,
    fontWeight: 300,
    color: "#663300",
    marginHorizontal: "auto",
    marginTop: 25,
  },
});
