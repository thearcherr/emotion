import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import IconLoader from "../../components/iconLoader";
import Message from "../../components/Message";

export default function Chat() {
  const initialMessages = [
    { text: "hello, you there?", sender: "ai" },
    { text: "hello, how are you doing? is everything fine?", sender: "user" },
    { text: "My name is whatever you'd like to call me!", sender: "ai" },
    {
      text: "yes I truly understand. How about you go on a walk tomorrow morning?",
      sender: "user",
    },
  ];

  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState<string>("");

  const scrollViewRef = useRef<ScrollView | null>(null);
  const refInput = useRef<TextInput | null>(null);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { text: inputValue.trim(), sender: "user" }]);
      setInputValue("");
    }
  };

  const inputStyles = StyleSheet.create({
    viewFixed: {
      position: "absolute",
      bottom: 10,
      left: 10,
      right: 10,
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderRadius: 20,
      borderColor: "black",
      backgroundColor: "white",
    },
  });

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.header}>
            <View style={styles.flexFirst}>
              <FontAwesome5 name="brain" size={24} color="white" />
              <Text style={styles.therapistLabel}>AI Therapist</Text>
            </View>
          </View>

          <ScrollView
            ref={scrollViewRef}
            style={styles.scrollView}
            contentContainerStyle={{ paddingBottom: 80 }}
          >
            <View style={styles.helloLabelView}>
              <Text style={styles.helloLabel}>
                Welcome! I&apos;m here to support you. How are you feeling
                today?
              </Text>
            </View>

            {messages.map((msg, index) => (
              <Message
                key={index}
                type={msg.sender === "user" ? "to" : "from"}
                message={msg.text}
              />
            ))}
          </ScrollView>

          <View style={inputStyles.viewFixed}>
            <TextInput
              value={inputValue}
              onChangeText={setInputValue}
              placeholder="hey I am..."
              style={styles.inputPrompt}
              ref={refInput}
              onSubmitEditing={handleSend}
            />
            <Pressable onPress={handleSend}>
              <IconLoader style={styles.iconSend} name="send" />
            </Pressable>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "teal",
    height: 60,
    marginTop: 40,
    justifyContent: "center",
  },
  flexFirst: {
    flexDirection: "row",
    gap: 10,
    marginHorizontal: 20,
    alignItems: "center",
  },
  therapistLabel: { flex: 1, color: "white", fontWeight: "800", fontSize: 15 },
  helloLabelView: {
    marginTop: 12,
    borderRadius: 20,
    padding: 10,
    borderColor: "teal",
    marginHorizontal: 20,
    borderWidth: 2,
  },
  helloLabel: { color: "teal", fontWeight: "500", textAlign: "center" },
  inputPrompt: { padding: 20, flex: 1 },
  scrollView: { flex: 1 },
  iconSend: { marginHorizontal: 20 },
  messageFrom: {
    backgroundColor: "teal",
    padding: 10,
    marginHorizontal: 20,
    maxWidth: 230,
    marginVertical: 20,
    borderRadius: 14,
  },
  messageFromText: { fontSize: 15, color: "white", fontWeight: "600" },
});
