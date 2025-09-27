import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="screens/signup"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="screens/login"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="screens/journal"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="screens/chat"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="screens/indexMood"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="screens/journalView"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
