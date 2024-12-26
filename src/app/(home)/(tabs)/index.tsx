import { useState } from "react";
import {
  Channel,
  ChannelList,
  Message,
  MessageInput,
  MessageList,
} from "stream-chat-expo";
import { Channel as ChannelType, StreamChat } from "stream-chat";
import { Link, router, Stack } from "expo-router";
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
            <Link href={"/(home)/users"} asChild>
              <FontAwesome5
                name="users"
                size={21}
                color="gray"
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
