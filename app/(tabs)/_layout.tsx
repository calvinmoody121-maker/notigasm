import { Tabs } from 'expo-router';
import { Home, LogIn, UserPlus } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          height: 85,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: '#6B7280',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="signin"
        options={{
          title: 'Sign In',
          tabBarIcon: ({ size, color }) => (
            <LogIn size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="addfriend"
        options={{
          title: 'Add Friend',
          tabBarIcon: ({ size, color }) => (
            <UserPlus size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}