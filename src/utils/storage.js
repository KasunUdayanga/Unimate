// src/utils/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

// Keys to store data
const USER_KEY = '@unimate_user';   // User විස්තර ගබඩා කිරීමට
const TASKS_KEY = '@unimate_tasks'; // Schedule/Tasks ගබඩා කිරීමට

// ==============================
// 1. USER AUTHENTICATION (Login & Sign Up)
// ==============================

// Register a new user
export const registerUser = async (userData) => {
  try {
    // සැබෑ ඇප් එකකදී අපි Users array එකක් තබා ගනිමු.
    // නමුත් මෙම සරල ව්‍යාපෘතිය සඳහා අපි එක් User කෙනෙක් පමණක් Save කරමු (Overwrite).
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
    return true;
  } catch (e) {
    console.error("Error registering user:", e);
    return false;
  }
};

// Check Login Credentials
export const checkLogin = async (email, password) => {
  try {
    const jsonValue = await AsyncStorage.getItem(USER_KEY);
    if (jsonValue != null) {
      const user = JSON.parse(jsonValue);
      // Email සහ Password ගැලපේදැයි පරීක්ෂා කිරීම
      if (user.email === email && user.password === password) {
        return user;
      }
    }
    return null; // Login අසාර්ථකයි
  } catch (e) {
    console.error("Error checking login:", e);
    return null;
  }
};

// ==============================
// 2. TASK MANAGEMENT (Schedule)
// ==============================

// Save a new Task
export const saveTask = async (newTask) => {
  try {
    const existingTasks = await getTasks();
    const updatedTasks = [...existingTasks, newTask]; // පවතින ලිස්ට් එකට අලුත් එක එකතු කිරීම
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks));
    return true;
  } catch (e) {
    console.error("Error saving task:", e);
    return false;
  }
};

// Get all Tasks
export const getTasks = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(TASKS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Error loading tasks:", e);
    return [];
  }
};

// Delete a Task by ID
export const deleteTask = async (taskId) => {
  try {
    const tasks = await getTasks();
    // අදාළ ID එක නැති අනිත් සියලු Tasks තෝරා ගැනීම (Filter)
    const filteredTasks = tasks.filter(task => task.id !== taskId);
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(filteredTasks));
    return filteredTasks; // අලුත් ලිස්ට් එක ආපසු යවයි (UI එක Update කිරීමට)
  } catch (e) {
    console.error("Error deleting task:", e);
    return [];
  }
};

// (Optional) Clear all data - Logout වීමේදී හෝ Reset කිරීමට
export const clearAllData = async () => {
  try {
    await AsyncStorage.clear();
  } catch(e) {
    console.error("Error clearing data:", e);
  }
};

