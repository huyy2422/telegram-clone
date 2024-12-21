import { router } from "expo-router";
import { useState } from "react";
import { Text } from "react-native";
import { ChannelList } from "stream-chat-expo";

export default function MainTabScreen() {
  return (
    <ChannelList
      onSelect={(channel) => router.push(`/channel/${channel.cid}`)}
    />
  );
}
