import { Link, router, Stack } from "expo-router";
import { useState } from "react";
import { Text } from "react-native";
import { ChannelList } from "stream-chat-expo";
import { useAuth } from "../../../providers/AuthProvider";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React from "react";

export default function MainTabScreen() {
  const { user } = useAuth();
  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Link href={"/(home)/user"} asChild>
              <FontAwesome5
                name="users"
                size={21}
                color="black"
                style={{ marginHorizontal: 15 }}
              />
            </Link>
          ),
        }}
      />
      <ChannelList
        filters={{ members: { $in: [user.id] } }}
        onSelect={(channel) => router.push(`/channel/${channel.cid}`)}
      />
    </>
  );
}
