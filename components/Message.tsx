import React from "react";
import { StyleSheet, Text, View } from "react-native";

type MessageTypes = { type: "from" | "to"; message: string };

export default function Message({ type, message }: MessageTypes) {
  const isFrom = type === "from";

  return (
    <View style={[styles.wrapper, isFrom ? styles.start : styles.end]}>
      <View
        style={[styles.bubble, isFrom ? styles.bubbleFrom : styles.bubbleTo]}
      >
        <Text style={isFrom ? styles.textFrom : styles.textTo}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    alignSelf: "stretch",
    flexDirection: "row",
    marginVertical: 6,
    paddingHorizontal: 12,
  },

  start: { justifyContent: "flex-start" },
  end: { justifyContent: "flex-end" },

  bubble: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 16,
    maxWidth: "75%",
  },

  bubbleFrom: {
    backgroundColor: "teal",
    borderTopLeftRadius: 4,
    marginVertical: 10,
  },

  bubbleTo: {
    backgroundColor: "#e0e0e0",
    borderTopRightRadius: 4,
  },

  textFrom: {
    color: "white",
    fontWeight: "600",
    fontSize: 15,
  },

  textTo: {
    color: "black",
    fontWeight: "600",
    fontSize: 15,
  },
});
