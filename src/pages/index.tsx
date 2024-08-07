import { useState, FormEvent, ChangeEvent } from 'react';

type Message = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

export default function Home() {
  const [chatHistory, setChatHistory] = useState<Message[]>([
    { role: 'system', content: 'You are a helpful assistant. You reply with very short answers.' }
  ]);
  const [userInput, setUserInput] = useState<string>('');
  const [error, setError] = useState<string | null>(null); // To capture and display error

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newChatHistory: Message[] = [...chatHistory, { role: 'user', content: userInput }];

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: newChatHistory })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const assistantMessage = data.message;

      setChatHistory([...newChatHistory, { role: 'assistant', content: assistantMessage }]);
      setUserInput('');
      setError(null); // Reset error if request is successful
    } catch (error: any) {
      console.error('Error fetching assistant response:', error);
      setError('Failed to fetch assistant response'); // Set error message
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  return (
    <div>
      <h1>Groq Chatbot</h1>
      <div>
        {chatHistory.map((message, index) => (
          <p key={index}><strong>{message.role}:</strong> {message.content}</p>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={handleChange}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
    </div>
  );
}
