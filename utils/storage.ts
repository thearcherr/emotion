// utils/storage.ts
import * as SecureStore from "expo-secure-store";

export async function hasMoodedToday(): Promise<boolean> {
  const today = new Date().toISOString().split("T")[0];
  const storedDate = await SecureStore.getItemAsync("storedDate");
  if (!storedDate) return false;
  return storedDate === today;
}

export async function setNewDay(): Promise<void> {
  const today = new Date().toISOString().split("T")[0];
  await SecureStore.setItemAsync("storedDate", today);
}

export async function resetDay(): Promise<void> {
  await SecureStore.deleteItemAsync("storedDate");
}

export async function storeTasks(tasks: object[]): Promise<void> {
  await SecureStore.setItemAsync("tasks", JSON.stringify(tasks));
}

export async function deleteTasks(): Promise<void> {
  await SecureStore.deleteItemAsync("tasks");
}

export async function storeJournals(journals: object[]): Promise<void> {
  const safe = Array.isArray(journals) ? journals : [];
  await SecureStore.setItemAsync("journals", JSON.stringify(safe));
}

export async function getTasks(): Promise<object[] | null> {
  const tasks = await SecureStore.getItemAsync("tasks");
  if (!tasks) return null;
  try {
    return JSON.parse(tasks);
  } catch (e) {
    console.warn("Failed to parse stored tasks:", e);
    return null;
  }
}

export async function getJournals(): Promise<object[]> {
  const stored = await SecureStore.getItemAsync("journals");
  if (!stored) return [];

  try {
    const parsed = JSON.parse(stored);

    if (!Array.isArray(parsed)) return [];

    const flat = parsed.flat(Infinity);

    const cleaned = flat.filter(
      (item) =>
        item &&
        typeof item === "object" &&
        ("description" in item || "title" in item)
    );

    return cleaned;
  } catch (e) {
    console.warn("Failed to parse stored journals:", e);
    return [];
  }
}
