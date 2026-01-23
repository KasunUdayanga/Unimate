import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

// Screens Import කිරීම (අපි කලින් සාදාගත් ෆයිල්ස්)
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import HomeScreen from './src/screens/HomeScreen';
import AddTaskScreen from './src/screens/AddTaskScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* Status Bar එකේ පාට වෙනස් කිරීම (Battery/Time පෙන්වන තීරුව) */}
      <StatusBar style="light" backgroundColor="#6200ea" />
      
      <Stack.Navigator 
        initialRouteName="Login" // ඇප් එක පටන් ගන්නා Screen එක
        screenOptions={{
          headerStyle: { backgroundColor: '#6200ea' }, // Header එකේ පාට (Purple)
          headerTintColor: '#fff', // Header එකේ අකුරු පාට (White)
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        {/* 1. Login Screen (Header එක අවශ්‍ය නැත) */}
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />

        {/* 2. Sign Up Screen (Header එක අවශ්‍ය නැත) */}
        <Stack.Screen 
          name="SignUp" 
          component={SignUpScreen} 
          options={{ headerShown: false }} 
        />

        {/* 3. Home / Dashboard Screen */}
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ 
            title: 'UniMate Schedule',
            headerBackVisible: false // Login එකට ආපසු යාම වළක්වයි
          }} 
        />

        {/* 4. Add Task Screen */}
        <Stack.Screen 
          name="AddTask" 
          component={AddTaskScreen} 
          options={{ title: 'Add New Task' }} 
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}