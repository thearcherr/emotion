import AntDesign from "@expo/vector-icons/AntDesign";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  StatusBar as StatusBarRN,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Login() {
  return (
    <>
      <StatusBar style="dark" backgroundColor="#ff0000" translucent={true} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <ImageBackground
            source={require("@/assets/images/app-bg.jpg")}
            style={styles.imageBg}
          >
            <Text style={styles.emotionText}>Welcome back!</Text>
            <Image
              source={require("@/assets/images/emotion-logo.png")}
              style={styles.imageLogo}
            />
            <View style={styles.form}>
              <TextInput
                placeholder="Email"
                style={{ ...styles.textInputEmail }}
              />
              <TextInput
                placeholder="Password"
                style={{
                  ...styles.textInputPassword,
                }}
                secureTextEntry
              />
              <Text style={styles.forgotPassText}>
                Forgot password? <Text style={styles.link}>Click here</Text>
              </Text>
              <TouchableOpacity style={styles.buttonSignUp}>
                <Text style={styles.textSignUp}>Login</Text>
              </TouchableOpacity>
              <View style={styles.hr} />
              <View style={styles.googleButton}>
                <AntDesign name="google" size={24} color="#00cc66" />
                <Text style={styles.googleButtonText}>
                  Continue with Google
                </Text>
              </View>
              <Text style={styles.loginText}>
                Not registered?{" "}
                <Link href="/screens/signup" style={styles.loginTextHighlight}>
                  Join here
                </Link>
              </Text>
            </View>
          </ImageBackground>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBarRN.currentHeight : 0,
    backgroundColor: "#b1d4be",
  },

  imageBg: {
    flex: 1,
  },

  emotionText: {
    fontSize: 34,
    fontWeight: 300,
    textAlign: "center",
    marginTop: 70,
    color: "#00994c",
  },

  imageLogo: {
    width: 200,
    height: 120,
    justifyContent: "center",
    marginHorizontal: "auto",
    marginTop: 50,
  },

  form: {
    marginTop: 20,
  },

  textInputEmail: {
    backgroundColor: "#ffffff",
    borderRadius: 9999,
    width: "auto",
    marginHorizontal: 20,
    paddingVertical: 15,
    paddingHorizontal: 13,
    color: "#006633",
  },

  textInputPassword: {
    backgroundColor: "#ffffff",
    borderRadius: 9999,
    width: "auto",
    marginHorizontal: 20,
    paddingVertical: 15,
    paddingHorizontal: 13,
    color: "#006633",
    marginTop: 25,
  },

  forgotPassText: {
    marginTop: 10,
    color: "#00000085",
    marginHorizontal: 30,
  },

  link: {
    textDecorationLine: "underline",
  },

  buttonSignUp: {
    margin: "auto",
    marginTop: 35,
    backgroundColor: "#00cc66",
    padding: 20,
    width: 150,
    borderRadius: 9999,
  },

  textSignUp: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: 800,
  },

  hr: {
    borderBottomColor: "#000",
    borderBottomWidth: 0.5,
    marginTop: 50,
    justifyContent: "center",
    marginHorizontal: 80,
  },

  googleButton: {
    margin: "auto",
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 9999,
    marginTop: 30,
  },

  googleButtonText: {
    fontSize: 17,
    color: "#000",
  },

  loginText: {
    margin: "auto",
    color: "#fff",
    fontWeight: 800,
    marginTop: 40,
  },

  loginTextHighlight: {
    textDecorationLine: "underline",
  },
});
