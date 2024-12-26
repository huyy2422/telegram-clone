import { useState } from 'react';
import { Channel, ChannelList, Message, MessageInput, MessageList } from 'stream-chat-expo';
import { Channel as ChannelType, StreamChat } from 'stream-chat';
import { router } from 'expo-router';
import { useAuth } from '../../../providers/AuthProvider';

export default function MainTabScreen() {
    const { user } = useAuth()
    return <ChannelList filters={{members: {$in: [user.id]}}} onSelect={(channel) => router.push(`/channel/${channel.cid}`)}/> 
}