import * as Notifications from "expo-notifications";

// Show alerts when app is foregrounded (dev-friendly)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function getPushToken(): Promise<string> {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") throw new Error("Notifications permission not granted");
  const token = (await Notifications.getExpoPushTokenAsync()).data; // "ExponentPushToken[... ]"
  return token;
}
