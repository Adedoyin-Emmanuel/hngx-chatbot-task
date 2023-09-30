import axios from "axios";
import { useEffect, useRef, useState } from "react";
import BotImage from "./../../assets/bot.svg";
import UserImage from "./../../assets/user.svg";
import "./ChatStyle.css";

const Chat = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState<string>("");
  const botTypingSpeed = 25;
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const backendEndpoint = import.meta.env.VITE_API_URL;

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
        ...prevMessages.slice(0, -1),
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

    // Fetch the data
    try {
      const response = await axios.post(backendEndpoint, {
        message: input,
      });


      if (response.data.code === 200) {
        await typeMessage(response.data.data.chatbot);
      } else {
        await typeMessage("Oops! Something went wrong.");
      }
    } catch (error) {
      console.error("API error:", error);
      await typeMessage("Oops! An error occurred.");
    }

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
        className="w-11/12 md:w-1/2 mx-auto bg-white rounded-lg "
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 mt-4 mb-4 flex items-start capitalize gap-x-5 ${
              message.isUser ? "bg-blue-200" : "bg-gray-200"
            } rounded-lg mb-2`}
          >
            {/* <p className="text-sm">{message.isUser ? "User" : "Bot"}</p> */}
            <img
              src={message.isUser ? UserImage : BotImage}
              className=" rounded-full w-10 h-10"
            />

            <p className="text-lg">{message.text}</p>
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-11/12 z-50 bg-slate-50 md:w-1/2 fixed bottom-0 left-0 right-0 mt-10"
      >
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full p-4 rounded focus:outline-none focus:ring ring border-sky-200 my-5"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="absolute top-9 right-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="text-sky-500"
          >
            <path
              d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
              fill="currentColor"
            ></path>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default Chat;
