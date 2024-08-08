import type { NextPage } from "next";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faRedo } from '@fortawesome/free-solid-svg-icons';


const Chat: NextPage = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    if (inputValue.trim()) {
      setMessages([...messages, inputValue]);
      setInputValue('');
    }
  };

  const handleReset = () => {
    setMessages([]);
  };

  return (
    <div>
      <div className="flex flex-col items-center h-screen w-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-black mb-4">Chatbot</h1>
        <div className="flex w-1/2 justify-end mb-4">
          <button
            onClick={handleReset}
            className="bg-red-500 text-white rounded px-4 py-2 text-lg focus:outline-none hover:bg-red-600 flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faRedo} className="mr-2" />
            <span>Clear</span>
          </button>
        </div>
        <div className="flex flex-col justify-center items-center h-screen w-1/2 bg-white border rounded border-gray-400 p-8 mb-4 overflow-y-auto">
          {/* Message area */}
          {messages.map((msg, index) => (
            <div key={index} className="self-end bg-blue-500 text-white p-2 rounded mb-2 max-w-xs">
              {msg}
            </div>
          ))}
        </div>
        <div className="flex w-1/2">
          <input
            type="text"
            placeholder="Enter message here"
            className="rounded-l-lg border border-gray-300 w-full p-2 text-lg focus:outline-none focus:border-blue-500"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white rounded-r-lg px-4 py-2 text-lg focus:outline-none hover:bg-blue-600 flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Chat;