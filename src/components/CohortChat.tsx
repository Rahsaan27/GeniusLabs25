import React, { useState, useEffect, useRef } from 'react';
import { Cohort } from '@/types/cohort';
import { Message } from '@/types/message';

interface CohortChatProps {
  cohort: Cohort;
  currentUser: { id: string; name: string };
  activeChannel: string;
}

export default function CohortChat({ cohort, currentUser, activeChannel }: CohortChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      userId: 'system',
      userName: 'GeniusLabs',
      content: `Welcome to ${cohort.name}! This is your cohort's group chat space. Ask questions, share resources, and collaborate with your peers.`,
      timestamp: Date.now(),
      cohortId: cohort.id,
      createdAt: new Date().toISOString(),
      type: 'message'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: `msg-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      content: newMessage.trim(),
      timestamp: Date.now(),
      cohortId: cohort.id,
      createdAt: new Date().toISOString(),
      type: 'message'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: number | string) => {
    const date = typeof timestamp === 'number' ? new Date(timestamp) : new Date(timestamp);
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (timestamp: number | string) => {
    const date = typeof timestamp === 'number' ? new Date(timestamp) : new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const getChannelName = () => {
    if (activeChannel === 'general') return '# General';
    if (activeChannel === 'announcements') return '📢 Announcements';
    if (activeChannel.startsWith('pod-')) {
      const podNum = activeChannel.split('-')[1];
      return `Pod ${podNum}`;
    }
    return activeChannel;
  };

  return (
    <div className="flex flex-col h-full bg-black">
      {/* Channel Header */}
      <div className="px-6 py-4 border-b border-gray-800 flex-shrink-0">
        <h2 className="text-lg font-semibold text-white">{getChannelName()}</h2>
        <p className="text-sm text-gray-500 mt-1">
          {activeChannel === 'announcements'
            ? 'Important updates and news'
            : activeChannel === 'general'
            ? 'General discussion and questions'
            : 'Small group collaboration space'}
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar-hide">
        <div className="max-w-4xl mx-auto">
          {messages.map((message, index) => {
            const showDate = index === 0 ||
              formatDate(message.timestamp) !== formatDate(messages[index - 1].timestamp);

            return (
              <div key={message.id}>
                {showDate && (
                  <div className="flex items-center justify-center my-6">
                    <div className="flex-1 h-px bg-gray-800"></div>
                    <span className="mx-4 text-xs text-gray-500 px-3 py-1">
                      {formatDate(message.timestamp)}
                    </span>
                    <div className="flex-1 h-px bg-gray-800"></div>
                  </div>
                )}

                <div className="flex items-start space-x-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                    message.userId === 'system'
                      ? 'bg-blue-900 text-blue-200'
                      : message.userId === currentUser.id
                      ? 'bg-gray-800 text-green-500'
                      : 'bg-gray-800 text-gray-300'
                  }`}>
                    {message.userName.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline space-x-2 mb-1">
                      <span className={`font-medium text-sm ${
                        message.userId === 'system'
                          ? 'text-blue-400'
                          : message.userId === currentUser.id
                          ? 'text-green-500'
                          : 'text-white'
                      }`}>
                        {message.userId === 'system' ? 'GeniusLabs' : message.userName}
                      </span>
                      <span className="text-xs text-gray-600">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                    <div className={`text-sm leading-relaxed whitespace-pre-wrap px-4 py-2 rounded-lg ${
                      message.userId === 'system'
                        ? 'bg-blue-950 text-blue-100 border border-blue-900'
                        : message.userId === currentUser.id
                        ? 'bg-gray-900 text-gray-100 border border-gray-800'
                        : 'bg-gray-900 text-gray-300 border border-gray-800'
                    }`}>
                      {message.content}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="px-6 pb-6 border-t border-gray-800">
        <div className="max-w-4xl mx-auto pt-4">
          <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Message ${cohort.name}`}
              className="w-full px-4 py-3 bg-transparent text-white placeholder-gray-600 resize-none focus:outline-none text-sm"
              rows={1}
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />

            <div className="px-4 pb-3 flex justify-between items-center">
              <div className="text-xs text-gray-600">
                Press Enter to send
              </div>

              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className={`font-medium px-4 py-1.5 rounded-md text-sm transition-colors ${
                  newMessage.trim()
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-gray-800 text-gray-600 cursor-not-allowed'
                }`}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}