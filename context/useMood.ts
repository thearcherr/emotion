import { create } from "zustand";

const useMood = create((set) => ({
  mood: 0,
  setMood: (mood: number) => set({ mood: mood }),
  storedDate: "",
  setStoredDate: (date: string) => set({ storedDate: date }),
  tasks: [],
  setTasks: (tasks: object[]) => set({ tasks: tasks }),
  tasksProgress: 10,
  setTasksProgress: (progress: number) => set({ tasksProgress: progress }),
  journals: [],
  setJournals: (journals: object[]) => set({ journals: journals }),
}));

export default useMood;
