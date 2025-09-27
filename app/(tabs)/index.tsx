import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import "react-native-gesture-handler";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import Task, { TaskInterface } from "../../components/Task";
import useMood from "../../context/useMood";
import { getAffirmationFromProgress } from "../../utils/functions";
import { deleteTasks, getTasks, hasMoodedToday } from "../../utils/storage";

const key = Constants.expoConfig?.extra?.GEMINI_API_KEY;

export default function Index() {
  const tasks = useMood((state: any) => state.tasks);
  const setTasks = useMood((state: any) => state.setTasks);
  const progress = useMood((state: any) => state.tasksProgress);
  const setProgress = useMood((state: any) => state.setTasksProgress);

  const [data, setData] = useState<null | any[]>(tasks);

  const [mooded, setMooded] = useState<boolean | null>(null);

  const router = useRouter();

  function handleTherapyButton() {
    router.push("/screens/chat");
  }

  useEffect(() => {
    async function initStorage() {
      const alreadyMooded = await hasMoodedToday(); // renamed function
      setMooded(alreadyMooded);

      const storedTasks = await getTasks();
      if (storedTasks) {
        setTasks(storedTasks);
      }
    }

    initStorage();
  }, []);

  useEffect(() => {
    if (typeof mooded === "boolean" && !mooded) {
      router.replace("/screens/indexMood");
    }
  }, [mooded]);

  if (typeof mooded === "boolean" && !mooded) {
    return null; // or loading spinner
  }

  async function handleTaskDone(title: string): Promise<void> {
    const remainingTasks = tasks.filter(
      (task: TaskInterface) => task.title !== title
    );

    setTasks(remainingTasks);
    setData(remainingTasks);

    const totalTasks = tasks.length;
    if (totalTasks > 0) {
      const perTask = 100 / totalTasks;
      const nextProgress = Math.min(
        100,
        Math.round((progress + perTask) * 100) / 100
      );
      setProgress(nextProgress);
    }

    if (remainingTasks.length < 1) {
      await deleteTasks();
    }
  }

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safeArea}>
        <ImageBackground
          source={require("@/assets/images/app-bg.jpg")}
          style={styles.bgImage}
        >
          <ScrollView>
            <Pressable onPress={handleTherapyButton}>
              <View style={styles.therapistInputView}>
                <Text style={styles.therapistInputText}>
                  Chat with AI Therapist
                </Text>
                <View style={styles.circleView}>
                  <Entypo
                    style={styles.emoji}
                    name="feather"
                    size={18}
                    color="green"
                  />
                </View>
              </View>
            </Pressable>
            <View style={styles.accountIconView}>
              <MaterialCommunityIcons
                name="account"
                size={28}
                color="green"
                style={styles.accountIcon}
              />
            </View>
            <Text style={styles.textGN}>Good Morning,</Text>
            <Text style={styles.textName}>Haseeb!</Text>
            <View style={styles.progressContainer}>
              <Text style={styles.progressAffirmationText}>
                {getAffirmationFromProgress(progress)}
              </Text>
              <AnimatedCircularProgress
                size={270}
                width={15}
                fill={progress}
                tintColor="#8BAF8F"
                style={styles.progress}
              />
            </View>
            <View style={styles.taskContainer}>
              <Text style={styles.planText}>Today&apos;s plan</Text>
              <View style={styles.tasksList}>
                {tasks &&
                  tasks.map((task: TaskInterface, index: number) => (
                    <Task
                      onPress={() => handleTaskDone(task.title)}
                      key={index}
                      tag={task.tag}
                      title={task.title}
                    />
                  ))}
                {data && data?.length < 1 && (
                  <Text style={styles.noDataText}>
                    You&apos;re done for today! ☺️
                  </Text>
                )}
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
    backgroundColor: "#b1d4be",
  },

  therapistInputView: {
    backgroundColor: "#ffffff70",
    borderRadius: 99999,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "#fff",
    padding: 15,
    flexDirection: "row",
    width: 220,
    marginTop: 20,
    gap: 20,
  },

  therapistInputText: {
    color: "#006633",
    alignSelf: "center",
  },

  circleView: {
    backgroundColor: "#ccffe570",
    borderRadius: 999,
    width: 28,
    height: 28,
    justifyContent: "center",
    alignContent: "center",
  },

  emoji: {
    alignSelf: "center",
  },

  accountIconView: {
    position: "absolute",
    right: 20,
    top: 25,
    width: 48,
    height: 48,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 9999,
    backgroundColor: "#ffffff70",
    justifyContent: "center",
    alignContent: "center",
  },

  accountIcon: {
    alignSelf: "center",
  },

  textGN: {
    marginHorizontal: "auto",
    fontSize: 34,
    top: 50,
    color: "#003319",
    fontWeight: 300,
  },

  textName: {
    marginHorizontal: "auto",
    marginTop: 45,
    color: "#003319",
    fontWeight: 300,
    fontSize: 34,
  },

  progressContainer: {
    width: 270,
    height: 270,
    marginHorizontal: "auto",
    top: 40,
    borderRadius: 9999,
    backgroundColor: "#ffffff70",
    justifyContent: "center",
  },

  progressAffirmationText: {
    alignSelf: "center",
    textAlign: "center",
    fontSize: 20,
    marginHorizontal: 50,
    color: "#003319",
    fontWeight: 300,
  },

  progress: {
    position: "absolute",
    marginHorizontal: "auto",
    alignSelf: "center",
  },

  taskContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    opacity: 0.7,
    marginHorizontal: 4,
    borderRadius: 10,
    marginTop: 80,
    marginBottom: 115,
  },

  planText: {
    color: "#003319",
    marginHorizontal: 20,
    marginTop: 20,
    fontSize: 18,
    fontWeight: 500,
  },

  tasksList: {
    marginHorizontal: "auto",
    marginBottom: 20,
  },

  noDataText: {
    marginTop: 20,
  },
});
