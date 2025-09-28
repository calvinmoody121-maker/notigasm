import { Tabs } from "expo-router";
import { Home, LogIn, UserPlus } from "lucide-react-native";
import { useEffect } from "react";
import { Platform, Alert } from "react-native";

// Conditional imports to prevent web bundling issues
let Notifications: any = null;
let axios: any = null;

// Only import on native platforms
if (Platform.OS !== 'web') {
  try {
    Notifications = require('expo-notifications');
    axios = require('axios');
  } catch (error) {
    console.warn('Failed to import native dependencies:', error);
  }
}

const API_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

// Set up notification handler only on native platforms
if (Notifications) {
  Notifications.setNotificationHandler({
    handleNotification: async (_notification: any) => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}

async function registerForPushNotificationsAsync() {
  // Skip on web platform
  if (Platform.OS === 'web') {
    console.log('Push notifications not supported on web platform');
    return;
  }

  // Check if notifications module is available
  if (!Notifications) {
    console.warn('Notifications module not available');
    return;
  }

  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      Alert.alert("Permission required", "Enable notifications in settings!");
      return;
    }

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
      });
    }

    const tokenData = await Notifications.getExpoPushTokenAsync();
    const token = tokenData.data;
    console.log("Expo Push Token:", token);

    // Send token to backend if axios is available
    if (axios && API_URL) {
      try {
        await axios.post(`${API_URL}/registerToken`, {
          handle: "myHandle", // Replace with actual user handle
          token,
        });
        console.log("Token registered with backend");
      } catch (err) {
        console.error("Error registering token:", err);
      }
    }

    return token;
  } catch (error) {
    console.error("Error setting up push notifications:", error);
  }
}

export default function TabLayout() {
  useEffect(() => {
    // Only run on native platforms
    if (Platform.OS !== 'web') {
      (async () => {
        await registerForPushNotificationsAsync();
      })();
    }
  }, []);
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
          height: 85,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarActiveTintColor: "#3B82F6",
        tabBarInactiveTintColor: "#6B7280",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ size, color }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="signin"
        options={{
          title: "Sign In",
          tabBarIcon: ({ size, color }) => <LogIn size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="addfriend"
        options={{
          title: "Add Friend",
          tabBarIcon: ({ size, color }) => (
            <UserPlus size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}