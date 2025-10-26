import React from 'react';
import { useMessages } from '../hooks/useMessages';
import { Mail } from 'lucide-react';

const MessagesList: React.FC = () => {
  const { messages, messagesCount, isLoading, error } = useMessages();

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-center py-8 text-gray-600">Loading messages...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-red-500 text-center py-8">Failed to load messages</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-solid border-pink-900 border-2">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Mail className="w-5 h-5 text-purple-600" />
        Your Messages ({messagesCount})
      </h2>

      {messages.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No messages yet</p>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-600"
            >
              <p className="text-gray-800 mb-2">{msg.content}</p>
              <p className="text-xs text-gray-500">
                {new Date(msg.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessagesList;