import React, { useState, useEffect, useRef } from 'react';
import { Message, Cohort } from '@/types/cohort';

interface CohortChatProps {
  cohort: Cohort;
  currentUser: { id: string; name: string };
}

export default function CohortChat({ cohort, currentUser }: CohortChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load messages from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem(`cohort-messages-${cohort.id}`);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // Add welcome message
      const welcomeMessage: Message = {
        id: 'welcome',
        userId: 'system',
        userName: 'GeniusLabs',
        content: `Welcome to ${cohort.name}! This is your cohort's group chat space. Ask questions, share resources, and collaborate with your peers.`,
        timestamp: new Date(),
        cohortId: cohort.id
      };
      setMessages([welcomeMessage]);
    }
  }, [cohort.id, cohort.name]);

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 1) { // Don't save just the welcome message
      localStorage.setItem(`cohort-messages-${cohort.id}`, JSON.stringify(messages));
    }
  }, [messages, cohort.id]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    setIsLoading(true);
    const message: Message = {
      id: Date.now().toString(),
      userId: currentUser.id,
      userName: currentUser.name,
      content: newMessage.trim(),
      timestamp: new Date(),
      cohortId: cohort.id
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: Date) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (timestamp: Date) => {
    const date = new Date(timestamp);
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

  return (
    <div className="flex flex-col h-full bg-gray-700">
      {/* Chat Header */}
      <div className="h-16 px-6 border-b border-gray-600 bg-gray-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-gray-400">#</span>
          <h3 className="text-lg font-semibold text-white">{cohort.name.toLowerCase().replace(/\s+/g, '-')}</h3>
          <div className="w-px h-6 bg-gray-600"></div>
          <p className="text-sm text-gray-400">{cohort.members.length + 1} members</p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="text-gray-400 hover:text-white p-2 rounded transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {messages.map((message, index) => {
          const showDate = index === 0 || 
            formatDate(message.timestamp) !== formatDate(messages[index - 1].timestamp);
          const previousMessage = index > 0 ? messages[index - 1] : null;
          const showAvatar = !previousMessage || 
            previousMessage.userId !== message.userId ||
            new Date(message.timestamp).getTime() - new Date(previousMessage.timestamp).getTime() > 300000; // 5 minutes

          return (
            <div key={message.id}>
              {showDate && (
                <div className="flex items-center justify-center my-6">
                  <div className="flex-1 h-px bg-gray-600"></div>
                  <span className="mx-4 text-xs text-gray-400 bg-gray-700 px-3 py-1 rounded">
                    {formatDate(message.timestamp)}
                  </span>
                  <div className="flex-1 h-px bg-gray-600"></div>
                </div>
              )}
              
              <div className={`group hover:bg-gray-600/20 px-4 py-1 rounded ${showAvatar ? 'mt-4' : 'mt-0'}`}>
                {showAvatar ? (
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                      message.userId === 'system' 
                        ? 'bg-blue-500 text-white'
                        : message.userId === currentUser.id
                        ? 'bg-green-400 text-black'
                        : 'bg-gray-600 text-white'
                    }`}>
                      {message.userId === 'system' ? '🤖' : message.userName.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline space-x-2 mb-1">
                        <span className={`font-semibold text-sm ${
                          message.userId === 'system' 
                            ? 'text-blue-400'
                            : message.userId === currentUser.id
                            ? 'text-green-400'
                            : 'text-white'
                        }`}>
                          {message.userId === 'system' ? 'GeniusLabs' : message.userName}
                        </span>
                        <span className="text-xs text-gray-400">{formatTime(message.timestamp)}</span>
                      </div>
                      <div className={`text-sm leading-relaxed whitespace-pre-wrap ${
                        message.userId === 'system' ? 'text-blue-200' : 'text-gray-200'
                      }`}>
                        {message.content}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="ml-13 pl-3">
                    <div className={`text-sm leading-relaxed whitespace-pre-wrap ${
                      message.userId === 'system' ? 'text-blue-200' : 'text-gray-200'
                    }`}>
                      {message.content}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="px-4 pb-4">
        <div className="bg-gray-600 rounded-lg">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Message #${cohort.name.toLowerCase().replace(/\s+/g, '-')}`}
            className="w-full px-4 py-3 bg-transparent text-white placeholder-gray-400 resize-none focus:outline-none"
            rows={1}
            style={{ minHeight: '44px', maxHeight: '120px' }}
          />
          <div className="px-4 pb-3 flex items-center justify-between">
            <div className="text-xs text-gray-400">
              Press Enter to send, Shift+Enter for new line
            </div>
            {newMessage.trim() && (
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim() || isLoading}
                className="bg-green-400 hover:bg-green-500 disabled:bg-gray-500 disabled:cursor-not-allowed text-black p-2 rounded-full transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}