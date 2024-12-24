import { PropsWithChildren, useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { StreamChat } from "stream-chat";
import { Chat, OverlayProvider } from "stream-chat-expo";
import { useAuth } from "./AuthProvider";
import { db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY);

export default function ChatProvider({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false);
  const { profile } = useAuth();

  useEffect(() => {
    console.log("USE_EFFECT: ", profile);
    if (!profile) {
      return;
    }
    const connect = async () => {
      console.log(profile.full_name);
      await client.connectUser(
        {
          id: profile.id,
          name: profile.full_name,
          image: profile.avatar_url,
        },
        client.devToken(profile.id)
      );
      setIsReady(true);
    };
    connect();

    return () => {
      client.disconnectUser();
    };
  }, [profile]);

  if (!isReady) {
    return <ActivityIndicator />;
  }

  return (
    <OverlayProvider>
      <Chat client={client}>{children}</Chat>
    </OverlayProvider>
  );
}
