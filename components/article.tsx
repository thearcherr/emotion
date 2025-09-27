import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ArticleProps {
  title: string;
  descShort: string;
}

export default function Article({ title, descShort }: ArticleProps) {
  return (
    <TouchableOpacity>
      <View style={styles.articleViewFlex2}>
        <Text style={styles.articleTitle}>{title}</Text>
        <Text style={styles.articleDetails}>{descShort}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  articleViewFlex2: {
    flexDirection: "column",
    gap: 10,
    maxWidth: 250,
  },

  articleTitle: {
    fontSize: 17,
    color: "black",
    fontWeight: 500,
    flexWrap: "wrap",
  },

  articleDetails: {
    fontSize: 14,
    color: "black",
    fontWeight: 300,
    flexWrap: "wrap",
  },
});
