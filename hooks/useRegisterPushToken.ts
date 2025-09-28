import { useEffect } from "react";
import { Platform } from "react-native";
import { getPushToken } from "../app/notifications";
import api from "../app/api";

/**
 * Hook: useRegisterPushToken
 * - Automatically gets push token on mount (native only) and registers it with backend
 * - Accepts a handle (string) to register under
 * - Logs errors to console
 */
export default function useRegisterPushToken(handle: string) {
  useEffect(() => {
    if (Platform.OS === "web") return;
    if (!handle) {
      console.warn("useRegisterPushToken: no handle provided");
      return;
    }

    (async () => {
      try {
        const token = await getPushToken();
        if (!token) {
          console.warn("No push token retrieved");
          return;
        }
        await api.registerToken(handle, token);
        console.log("Push token registered");
      } catch (err) {
        console.error("Failed to register push token:", err);
      }
    })();
  }, [handle]);
}
