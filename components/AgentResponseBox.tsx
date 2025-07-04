import { useState, useEffect } from 'react';
import MiniChatLog from './MiniChatLog';

interface Props {
  lastAssistantReply: string | null;
  lastUserPrompt: string | null;
}

export default function AgentResponseBox({ lastAssistantReply, lastUserPrompt }: Props) {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([]);

  useEffect(() => {
    if (lastUserPrompt) {
      setMessages((prev) => [...prev, { role: 'user', text: lastUserPrompt }]);
    }
  }, [lastUserPrompt]);

  useEffect(() => {
    if (lastAssistantReply) {
      setMessages((prev) => [...prev, { role: 'assistant', text: lastAssistantReply }]);
    }
  }, [lastAssistantReply]);

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Chat Jarvis</h3>
      <MiniChatLog messages={messages.slice(-20)} />
    </div>
  );
}
