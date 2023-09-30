import { useState } from "react";
import "./ChatStyle.css";

const Chat = () => {
  const [messages, setMessages] = useState<string[]>([
    "Hello, how can I assist you today?",
    "Feel free to ask any questions.",
  ]);
  const [input, setInput] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Add user's message to the chat
    setMessages([...messages, `User: ${input}`]);
    setInput("");

    // Simulate a chatbot response (dummy data)
    setTimeout(() => {
      const response = `Chatbot: Thanks for your message, "${input}".`;
      setMessages([...messages, response]);
    }, 1000); // Simulating an API response delay
  };

  return (
    <div className="p-4 bg-gray-200 h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-4">
        <div className="h-80 overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-2 ${
                index % 2 === 0 ? "bg-blue-200" : "bg-gray-200"
              } rounded-lg mb-2`}
            >
              {message}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="text"
            placeholder="Type your message..."
            className="w-full p-2 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-2 hover:bg-blue-600 transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
