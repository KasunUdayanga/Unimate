import AsyncStorage from "@react-native-async-storage/async-storage";

const USERS_KEY = "users";
const TASKS_KEY = "tasks";

// User Registration
export const registerUser = async (user) => {
  try {
    const users = await AsyncStorage.getItem(USERS_KEY);
    const userList = users ? JSON.parse(users) : [];

    const existingUser = userList.find((u) => u.email === user.email);
    if (existingUser) {
      return false;
    }

    userList.push(user);
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(userList));
    return true;
  } catch (error) {
    console.error("Error registering user:", error);
    return false;
  }
};

// User Login
export const checkLogin = async (email, password) => {
  try {
    const users = await AsyncStorage.getItem(USERS_KEY);
    const userList = users ? JSON.parse(users) : [];

    const user = userList.find(
      (u) => u.email === email && u.password === password
    );
    return user || null;
  } catch (error) {
    console.error("Error checking login:", error);
    return null;
  }
};

// Save Task
export const saveTask = async (task) => {
  try {
    const tasks = await AsyncStorage.getItem(TASKS_KEY);
    const taskList = tasks ? JSON.parse(tasks) : [];
    
    const taskWithType = {
      ...task,
      type: task.type || 'assignment'
    };
    
    taskList.push(taskWithType);
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(taskList));
    return true;
  } catch (error) {
    console.error("Error saving task:", error);
    return false;
  }
};

// Get All Tasks
export const getTasks = async () => {
  try {
    const tasks = await AsyncStorage.getItem(TASKS_KEY);
    const taskList = tasks ? JSON.parse(tasks) : [];
    
    // Ensure all tasks have a type field
    return taskList.map(task => ({
      ...task,
      type: task.type || 'assignment'
    }));
  } catch (error) {
    console.error("Error getting tasks:", error);
    return [];
  }
};

// Delete Task
export const deleteTask = async (id) => {
  try {
    const tasks = await AsyncStorage.getItem(TASKS_KEY);
    const taskList = tasks ? JSON.parse(tasks) : [];

    const updatedList = taskList.filter((task) => task.id !== id);
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updatedList));
    return updatedList;
  } catch (error) {
    console.error("Error deleting task:", error);
    return [];
  }
};

// Clear All Data (Logout)
export const clearAllData = async () => {
  try {
    await AsyncStorage.removeItem(TASKS_KEY);
    return true;
  } catch (error) {
    console.error("Error clearing data:", error);
    return false;
  }
};