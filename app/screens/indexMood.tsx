import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import useMood from "../../context/useMood";

import { SafeAreaView } from "react-native-safe-area-context";
import { setNewDay, storeTasks } from "../../utils/storage";

export default function IndexMood() {
  const [parentBgColor, setParentBgColor] = useState<string>("#dedfdc");

  const [moodIndex, setMoodIndex] = useState<number>(-1);

  const [tagsPressed, setTagsPressed] = useState<any[]>([]);

  const [moodFinalized, setMoodFinalized] = useState<boolean>(false);

  const setTasks = useMood((state: any) => state.setTasks);
  const tasks = useMood((state: any) => state.tasks);

  const ref = useRef(null);

  const opacity = useSharedValue(1);
  const opacityText = useSharedValue(1);

  const fadeStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const loadingTextStyle = useAnimatedStyle(() => ({
    opacity: opacityText.value,
  }));

  // universal tags
  const tags = [
    "Work / Studies",
    "Health",
    "Sleep / Rest",
    "Finances",
    "Relationships",
    "Social Life",
    "Environment",
    "Personal Growth",
    "Hobbies / Fun",
    "Stress / Mental State",
  ];

  useEffect(() => {
    switch (moodIndex) {
      case 0:
        setParentBgColor("#dedfdc");
        break;

      case 1:
        setParentBgColor("#d4dff8");
        break;

      case 2:
        setParentBgColor("#dceef6");
        break;

      case 3:
        setParentBgColor("#dcebd8");
        break;

      case 4:
        setParentBgColor("#f0e5f5");
        break;

      default:
        break;
    }
  }, [moodIndex, parentBgColor]);

  function newTag(tag: string) {
    if (tagsPressed.includes(tag)) {
      console.log("here");
      const newArr = tagsPressed.filter((tag_) => tag_ !== tag);
      setTagsPressed(newArr);
      return;
    }
    setTagsPressed([...tagsPressed, tag]);
  }

  const router = useRouter();

  // inside IndexMood component
  async function finalizeMood() {
    setMoodFinalized(true);
    opacity.value = withTiming(0, { duration: 400 }); // duration in ms
    // create tasks locally
    const newTasks = [
      {
        tag: "creativity",
        title: "draw your favorite artist",
        description: "...",
      },
      {
        tag: "reading",
        title: "read 2 pages of a romantic novel",
        description: "...",
      },
      { tag: "connection", title: "text hi to your mom", description: "..." },
    ];

    // wait for animation to finish visually if you want (300ms below)
    setTimeout(async () => {
      setTasks(newTasks); // update state
      await setNewDay(); // persist date
      await storeTasks(newTasks); // persist tasks (use newTasks, not tasks state)
      router.replace("/(tabs)");
    }, 300);
  }

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView
        ref={ref}
        style={[styles.safeAreaView, { backgroundColor: parentBgColor }]}
      >
        <View style={styles.questionTextView}>
          <Animated.Text style={[styles.questionText, fadeStyle]}>
            Today I feel
          </Animated.Text>
        </View>

        <ImageBackground
          source={require("../../assets/images/mood_hug.png")}
          style={styles.imageBackground}
          imageStyle={styles.imageStyle}
        >
          {/* Tint overlay */}
          <View
            style={[
              StyleSheet.absoluteFillObject,
              { backgroundColor: parentBgColor, opacity: 0.35 },
            ]}
          />

          <Animated.View style={[styles.viewMain, fadeStyle]}>
            {/* Emojis */}
            <View style={styles.viewEmojisList}>
              <Pressable onPress={() => setMoodIndex(0)}>
                <FontAwesome5
                  name="sad-cry"
                  size={moodIndex === 0 ? 54 : 36}
                  color={"#00000075"}
                />
              </Pressable>
              <Entypo
                onPress={() => setMoodIndex(1)}
                name="emoji-sad"
                size={moodIndex === 1 ? 54 : 36}
                color={moodIndex === 1 ? "#b6b1f7" : "#00000075"}
              />
              <Entypo
                onPress={() => setMoodIndex(2)}
                name="emoji-neutral"
                size={moodIndex === 2 ? 54 : 36}
                color={moodIndex === 2 ? "#acd1e0" : "#00000075"}
              />
              <FontAwesome5
                onPress={() => setMoodIndex(3)}
                name="smile"
                size={moodIndex === 3 ? 54 : 36}
                color={moodIndex === 3 ? "#96bc8b" : "#00000075"}
              />
              <FontAwesome5
                onPress={() => setMoodIndex(4)}
                name="smile-beam"
                size={moodIndex === 4 ? 54 : 36}
                color={moodIndex === 4 ? "#c794d9" : "#00000075"}
              />
            </View>

            {/* Tags */}
            <View style={styles.tagList}>
              {tags.map((tag, i) => (
                <Pressable onPress={() => newTag(tag)} key={i}>
                  <View
                    style={[
                      styles.tag,
                      {
                        borderColor: tagsPressed.includes(tag)
                          ? "cornflowerblue"
                          : "white",
                      },
                    ]}
                  >
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                </Pressable>
              ))}
            </View>
            <Pressable onPress={finalizeMood} style={styles.moodButton}>
              <Text style={styles.moodButtonText}>Save</Text>
            </Pressable>
          </Animated.View>
          {moodFinalized && (
            <Animated.Text style={[styles.loadingText, loadingTextStyle]}>
              We&apos;re curating your page, just a bit.. 😊
            </Animated.Text>
          )}
        </ImageBackground>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },

  imageBackground: {
    flex: 1,
  },

  imageStyle: {
    resizeMode: "cover",
    width: 320,
    height: 320,
    marginHorizontal: "auto",
    marginVertical: "auto",
    opacity: 0.55,
  },

  viewMain: {
    flex: 1,
    backgroundColor: "transparent",
    paddingHorizontal: 20,
    alignItems: "center", // center horizontally
    marginTop: 300,
  },

  questionTextView: {
    alignItems: "center",
    marginTop: 50,
    marginBottom: 20,
  },

  questionText: {
    fontSize: 20,
    color: "#000",
    fontWeight: "300",
    textAlign: "center",
  },

  viewEmojisList: {
    flexDirection: "row",
    gap: 20,
    borderRadius: 9999,
    backgroundColor: "#FCF8F8",
    padding: 15,
    marginBottom: 20, // 🔑 ensures tags are just below
  },

  tagList: {
    flexDirection: "row",
    flexWrap: "wrap", // 🔑 makes tags wrap instead of overflowing
    justifyContent: "center",
    gap: 10,
  },

  tag: {
    borderRadius: 9999,
    backgroundColor: "#ffffff70",
    borderWidth: 1,
    borderColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 8,
  },

  tagText: {
    color: "black",
    fontWeight: "300",
  },

  moodButton: {
    paddingHorizontal: 75,
    paddingVertical: 20,
    marginHorizontal: "auto",
    marginTop: 25,
    borderRadius: 9999,
    backgroundColor: "#fff",
  },

  moodButtonText: {
    fontWeight: 500,
  },

  loadingText: {
    fontSize: 20,
    fontWeight: 400,
    position: "absolute",
    alignSelf: "center",
    marginVertical: 350,
  },
});
