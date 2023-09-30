import { useEffect, useRef, useState } from "react";
import BotImage from "./../../assets/bot.svg";
import UserImage from "./../../assets/user.svg";
import "./ChatStyle.css";

const Chat = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState<string>("");
  const botTypingSpeed = 25;
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const addMessage = (message: string, isUser: boolean) => {
    const newMessage = {
      text: message,
      isUser,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const typeMessage = async (message: string) => {
    await new Promise((resolve) => setTimeout(resolve, botTypingSpeed));
    addMessage(``, false);
    scrollToBottom();

    for (let i = 0; i < message.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, botTypingSpeed));
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1), // Remove the last message
        {
          text: `${prevMessages[prevMessages.length - 1].text}${message[i]}`,
          isUser: false,
        },
      ]);
      scrollToBottom();
    }
  };
  const scrollToBottom = () => {
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
      chatContainer.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (input.trim() === "") return;

    addMessage(`${input}`, true);
    setInput("");

    await typeMessage(`Thanks for your message`);

    scrollToBottom();
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <div className=" p-4 ">
      <div
        id="chat-container"
        ref={chatContainerRef}
        className="w-11/12 md:w-1/2 mx-auto bg-white rounded-lg overflow-y-auto"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 mt-4 mb-4 flex items-center capitalize gap-x-5 ${
              message.isUser ? "bg-blue-200" : "bg-gray-200"
            } rounded-lg mb-2`}
          >
            {/* <p className="text-sm">{message.isUser ? "User" : "Bot"}</p> */}
            <img
              src={message.isUser ? UserImage : BotImage}
              className="rounded-full w-10 h-10"
            />

            <p className="text-lg">{message.text}</p>
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-11/12 z-50 bg-slate-50 md:w-1/2 fixed bottom-0 left-0 right-0 mt-10"
      >
        <section className="grouped-item">
          <input
            type="text"
            placeholder="Type your message..."
            className="w-full p-4 rounded focus:outline-none focus:ring ring border-sky-300 "
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-2 hover:bg-blue-600 transition"
          >
            Send
          </button>
        </section>
      </form>
    </div>
  );
};

export default Chat;
