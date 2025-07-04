import { useEffect, useRef } from 'react';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

interface Props {
  messages: Message[];
}

export default function MiniChatLog({ messages }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="border rounded-lg p-4 h-72 overflow-y-auto bg-gray-50">
      {messages.map((m, idx) => (
        <div
          key={idx}
          className={`my-1 flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <span
            className={`px-3 py-2 rounded-lg max-w-[85%] ${
              m.role === 'user' ? 'bg-blue-100' : 'bg-gray-200'
            }`}
          >
            {m.text}
          </span>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
