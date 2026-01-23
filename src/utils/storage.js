import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_KEY = "@unimate_user";
const TASKS_KEY = "@unimate_tasks";

export const registerUser = async (userData) => {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
    return true;
  } catch (e) {
    console.error("Error registering user:", e);
    return false;
  }
};

export const checkLogin = async (email, password) => {
  try {
    const jsonValue = await AsyncStorage.getItem(USER_KEY);
    if (jsonValue != null) {
      const user = JSON.parse(jsonValue);
      if (user.email === email && user.password === password) {
        return user;
      }
    }
    return null;
  } catch (e) {
    console.error("Error checking login:", e);
    return null;
  }
};

export const saveTask = async (newTask) => {
  try {
    const existingTasks = await getTasks();
    const updatedTasks = [...existingTasks, newTask];
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks));
    return true;
  } catch (e) {
    console.error("Error saving task:", e);
    return false;
  }
};

export const getTasks = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(TASKS_KEY);
    return jsonValue === null ? [] : JSON.parse(jsonValue);
  } catch (e) {
    console.error("Error loading tasks:", e);
    return [];
  }
};

export const deleteTask = async (taskId) => {
  try {
    const tasks = await getTasks();
    const filteredTasks = tasks.filter((task) => task.id !== taskId);
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(filteredTasks));
    return filteredTasks;
  } catch (e) {
    console.error("Error deleting task:", e);
    return [];
  }
};

export const clearAllData = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.error("Error clearing data:", e);
  }
};
