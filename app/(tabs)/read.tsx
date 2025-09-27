import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Article from "../../components/article";
import IconLoader from "../../components/iconLoader";

export default function Chat() {
  const data = [
    {
      title: "7 ways to find comfort anywhere",
      descShort: "Learn 7 ways to find comfort anywhere, everywhere.",
    },
    {
      title: "7 ways to find comfort anywhere",
      descShort: "Learn 7 ways to find comfort anywhere, everywhere.",
    },
    {
      title: "7 ways to find comfort anywhere",
      descShort: "Learn 7 ways to find comfort anywhere, everywhere.",
    },
    {
      title: "7 ways to find comfort anywhere",
      descShort: "Learn 7 ways to find comfort anywhere, everywhere.",
    },
    {
      title: "7 ways to find comfort anywhere",
      descShort: "Learn 7 ways to find comfort anywhere, everywhere.",
    },
  ];

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView>
          <View style={styles.mainView}>
            {/* Header */}
            <View style={styles.readHeader}>
              <Text style={styles.readHeaderTitle}>Read</Text>
              <Text style={styles.readHeaderDesc}>
                Read articles to support your mental wellness journey.
              </Text>
            </View>

            {/* Featured */}
            <TouchableOpacity>
              <View style={styles.featuredArticleContainer}>
                <View style={styles.containerTag}>
                  <Text style={styles.textFeaturedTag}>Featured</Text>
                </View>
                <View style={styles.featuredArticleData}>
                  <Text style={styles.featuredArticleTitle}>
                    5 Mindfullness techniques to help you feel better
                  </Text>
                  <Text style={styles.featuredArticleDetails}>
                    Learn simple yet effective mindfulness practices you can use
                    anywhere, anytime.
                  </Text>
                  <View style={styles.minuteDetailsView}>
                    <Text style={styles.minutesText}>8 min to read</Text>
                    <IconLoader
                      style={styles.iconRight}
                      name="right"
                      color="teal"
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            {/* Articles */}
            <View style={styles.todaysArticlesHeadingView}>
              <Text style={styles.todaysArticlesHeading}>
                Today&apos;s Articles
              </Text>
            </View>

            <View style={styles.articleDisplayListFlex}>
              {data.map((article, index) => (
                <View key={index} style={styles.articleView}>
                  <View style={styles.articleViewFlex1}>
                    <View style={styles.articleViewIconLabel}>
                      <IconLoader name="reading" color="white" />
                    </View>
                    <View style={styles.articleViewFlex2}>
                      <Article
                        title={article.title}
                        descShort={article.descShort}
                      />
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: "#0d9588",
    flex: 1,
  },

  mainView: {
    backgroundColor: "white",
    flex: 1,
  },

  readHeader: {
    backgroundColor: "#0d9588",
    padding: 20,
    flexDirection: "column",
    gap: 12,
  },

  readHeaderTitle: {
    fontSize: 24,
    color: "white",
    fontWeight: "600",
  },

  readHeaderDesc: {
    color: "white",
    fontWeight: "400",
  },

  featuredArticleContainer: {
    marginTop: 20,
    backgroundColor: "#12b19f",
    marginHorizontal: 14,
    borderRadius: 20,
    padding: 20,
  },

  containerTag: {
    borderRadius: 9999,
    backgroundColor: "#47c1b3",
    alignSelf: "flex-start",
    paddingVertical: 7,
    paddingHorizontal: 10,
  },

  textFeaturedTag: {
    color: "white",
    fontWeight: "600",
  },

  featuredArticleData: {
    marginVertical: 10,
    flexDirection: "column",
    gap: 8,
  },

  featuredArticleTitle: {
    color: "white",
    fontWeight: "600",
    fontSize: 20,
  },

  featuredArticleDetails: {
    color: "white",
    fontWeight: "500",
  },

  minuteDetailsView: {
    flexDirection: "row",
  },

  minutesText: {
    color: "white",
    fontWeight: "400",
    fontSize: 15,
    flex: 1,
    textAlignVertical: "center",
  },

  iconRight: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 999,
  },

  todaysArticlesHeadingView: {
    marginHorizontal: 25,
    marginVertical: 20,
  },

  todaysArticlesHeading: {
    color: "black",
    fontSize: 20,
    fontWeight: "600",
  },

  articleDisplayListFlex: {
    flexDirection: "column",
    gap: 20,
    marginBottom: 100,
  },

  articleView: {
    marginHorizontal: 20,
    borderWidth: 0.5,
    borderColor: "black",
    borderRadius: 20,
    backgroundColor: "white",
    padding: 20,
  },

  articleViewFlex1: {
    flexDirection: "row",
    gap: 14,
    alignItems: "flex-start",
  },

  articleViewIconLabel: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "teal",
    padding: 15,
  },

  articleViewFlex2: {
    flexDirection: "column",
    gap: 8,
    flexShrink: 1,
  },

  articleTitle: {
    fontSize: 17,
    color: "black",
    fontWeight: "500",
    flexWrap: "wrap",
  },

  articleDetails: {
    fontSize: 14,
    color: "black",
    fontWeight: "300",
    flexWrap: "wrap",
  },
});
