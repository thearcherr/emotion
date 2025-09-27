import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import IconLoader from "./iconLoader";

interface TaskInterface {
  tag: string;
  title: string;
  description?: string;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

export default function Task({ tag, title, onPress }: TaskInterface) {
  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.task}>
          <View style={styles.flexView}>
            <IconLoader name={tag} />
            <Text> {title} </Text>
            <IconLoader name="right" />
          </View>
          <Text style={styles.tag}> {tag} </Text>
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  task: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 35,
    marginTop: 20,
    borderWidth: 0.5,
    borderColor: "teal",
  },

  flexView: {
    flexDirection: "row",
    gap: 10,
  },

  tag: {
    color: "teal",
    marginTop: 10,
    maxWidth: 100,
    borderWidth: 1,
    borderColor: "teal",
    borderRadius: 999,
    textAlign: "center",
    fontSize: 16,
    padding: 5,
  },
});

export { TaskInterface };
