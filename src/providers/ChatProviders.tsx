import React, { useEffect } from "react";
import { PropsWithChildren } from "react";
import { StreamChat } from "stream-chat";
import { Chat, OverlayProvider } from "stream-chat-expo";

const client = StreamChat.getInstance("7emjee66w6nw");

export default function ChatProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    const connect = async () => {
      await client.connectUser(
        {
          id: "ghuy",
          name: "Gia Huy",
          image: "https://i.imgur.com/fR9Jz14.png",
        },
        client.devToken("ghuy")
      );

      //   const channel = client.channel("messaging", "the_park", {
      //     name: "The Park",
      //   });

      //   await channel.watch()
    };

    connect();
  });
  return (
    <OverlayProvider>
      <Chat client={client}>{children}</Chat>
    </OverlayProvider>
  );
}
