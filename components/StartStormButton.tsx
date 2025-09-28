import React, { useState } from "react";
import { Pressable, Text, ActivityIndicator, StyleSheet } from "react-native";
import api from "../app/api";

export default function StartStormButton() {
  const [loading, setLoading] = useState(false);

  async function start() {
    setLoading(true);
    try {
      const res = await api.startStorm({
        senderHandle: "yash",
        targetHandle: "yash",
        frequency: "MED",
        minutes: 1,
        mode: "csv",
        count: 5,
        theme: "funny, wholesome",
      });
      console.log("startStorm response:", res);
    } catch (err) {
      console.error("startStorm failed:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Pressable style={styles.button} onPress={start} disabled={loading}>
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.text}>Start Test Storm</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#3B82F6",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
