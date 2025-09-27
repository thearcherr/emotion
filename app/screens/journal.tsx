import { useRouter } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useMood from "../../context/useMood";
import {
  getDateToday,
  getDayTodayInt,
  getDayTodayName,
} from "../../utils/functions";
import { storeJournals } from "../../utils/storage";

export default function JournalNewScreen() {
  const [selection, setSelection] = useState<boolean>(false);
  const [emoji, setEmoji] = useState<string>("🙂");

  const [titleText, setTitleText] = useState<string>("");
  const [descText, setDescText] = useState<string>("");

  const journals = useMood((state: any) => state.journals);
  const setJournals = useMood((state: any) => state.setJournals);

  const router = useRouter();

  function handleSelection(emojiType: string) {
    switch (emojiType) {
      case "veryhappy":
        setSelection(false);
        setEmoji("😊");
        return;

      case "happy":
        setSelection(false);
        setEmoji("🙂");
        return;

      case "neutral":
        setSelection(false);
        setEmoji("😐");
        return;

      case "sad":
        setSelection(false);
        setEmoji("☹️");
        return;

      case "verysad":
        setSelection(false);
        setEmoji("😭");
        return;

      default:
        setSelection(false);
        setEmoji("🙂");
        return;
    }
  }

  async function handleSaveJournal() {
    if (titleText.length < 5 || descText.length < 10) return null;
    const newJournal = {
      day: getDayTodayName(),
      date: getDayTodayInt(),
      expression: emoji,
      title: titleText,
      description: descText,
    };

    const prev = Array.isArray(journals) ? journals : [];
    const next = [newJournal, ...prev];

    setJournals(next);
    await storeJournals(next);

    router.replace("/(tabs)/journal");
  }

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.choiceView}>
          <Text style={styles.dateText}> {getDateToday("/")} </Text>
          <Text onPress={() => setSelection(true)} style={styles.expression}>
            {emoji}
          </Text>
        </View>
        {/* hidden currently */}
        <View
          style={{
            ...styles.expressionSelect,
            display: selection ? "flex" : "none",
          }}
        >
          <Text
            onPress={() => handleSelection("veryhappy")}
            style={styles.expression}
          >
            😊
          </Text>
          <Text
            onPress={() => handleSelection("happy")}
            style={styles.expression}
          >
            🙂
          </Text>
          <Text
            onPress={() => handleSelection("neutral")}
            style={styles.expression}
          >
            😐
          </Text>
          <Text
            onPress={() => handleSelection("sad")}
            style={styles.expression}
          >
            ☹️
          </Text>
          <Text
            onPress={() => handleSelection("verysad")}
            style={{ ...styles.expression, marginBottom: 10 }}
          >
            😭
          </Text>
        </View>
        <View style={styles.titleInputView}>
          <TextInput
            placeholder="Title.."
            style={styles.titleInput}
            maxLength={50}
            value={titleText}
            onChangeText={setTitleText}
          />
          <TextInput
            placeholder="How was your day?"
            multiline
            style={styles.descInput}
            value={descText}
            onChangeText={setDescText}
          />
        </View>
        <TouchableOpacity onPress={handleSaveJournal} style={styles.buttonSave}>
          <Text style={styles.buttonSaveText}>Save</Text>
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

  choiceView: {
    flexDirection: "row",
    gap: 24,
    borderBottomWidth: 1,
    marginTop: 60,
    marginHorizontal: 10,
  },

  dateText: {
    color: "#663300",
    fontSize: 25,
    flex: 1,
  },

  expression: {
    fontSize: 24,
  },

  titleInputView: {
    marginTop: 20,
    marginHorizontal: 5,
    flex: 1,
  },

  titleInput: {
    fontSize: 24,
    borderBottomWidth: 0.5,
  },

  descInputView: {
    marginTop: 20,
    marginHorizontal: 5,
  },

  descInput: {
    flex: 1,
    fontSize: 24,
    marginTop: 10,
    textAlignVertical: "top",
    padding: 10,
    height: "auto",
  },

  buttonSave: {
    padding: 10,
    paddingVertical: 20,
    backgroundColor: "#e8ba50",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
    marginHorizontal: 20,
    borderRadius: 20,
  },

  buttonSaveText: {
    color: "#663300",
    fontSize: 18,
    fontWeight: 800,
  },

  expressionSelect: {
    position: "absolute",
    right: 10,
    top: 60,
    width: "auto",
    height: "auto",
    backgroundColor: "#fff",
    borderRadius: 9999,
    paddingHorizontal: 10,
    zIndex: 50,
  },
});
