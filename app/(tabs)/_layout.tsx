import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { Tabs } from "expo-router";
import { Image, StyleSheet } from "react-native";
import IconLoader from "../../components/iconLoader";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          width: "auto",
          marginHorizontal: 20,
          borderRadius: 9999,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          maxHeight: 65,
          marginBottom: 65,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: () => (
            <Image
              source={require("../../assets/images/emotion-logo.png")}
              style={styles.imageIcon}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          title: "journal",
          tabBarIcon: () => (
            <SimpleLineIcons name="notebook" size={24} color="teal" />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="read"
        options={{
          title: "read",
          tabBarIcon: () => <IconLoader name="reading" />,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  imageIcon: {
    width: 35,
    height: 24,
  },
});
