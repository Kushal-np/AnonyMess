import React, { useState, FormEvent, ChangeEvent } from "react";
import { useMessages } from "../hooks/useMessages";
import { Send } from "lucide-react";

const SendMessageForm: React.FC = () => {
  const [recipient, setRecipient] = useState("");
  const [content, setContent] = useState("");
  const { sendMessage, isSending, sendError, sendSuccess } = useMessages();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (recipient.trim() && content.trim()) {
      sendMessage(
        { username: recipient, content },
        {
          onSuccess: () => {
            setRecipient("");
            setContent("");
          },
        }
      );
    }
  };

  const handleRecipientChange = (e:ChangeEvent<HTMLInputElement>) =>{
    setRecipient(e.target.value);
  } 

  const handleContentChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }

  return (
    <div className="border-solid border-5 border-green-800">
        <h2>
            <Send className="w-5 h-5 text-purple-600"/>
            Send Anonymous Message
        </h2>
        <form>
            <div>
                <label htmlFor="recipient" className="block text-sm font-medium text-green-800 mb-2">

                Recipient Username

                </label>
                <input type="text" id="recipient" value={recipient} onChange={handleRecipientChange} className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition" placeholder="Enter Username" required disabled={isSending} />
            </div>
            <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea id="content" value={content} onChange={handleContentChange} className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500" rows={4} placeholder="Type your anonymous message" required disabled={isSending}/>

            </div>
            <button type="submit" disabled={isSending} className="w-full bg-purple-600 text-white py-2 rouded-lg font-semibold hover:bg-purple-700 transition">
                {isSending ? "Sending":"Send Message"}
            </button>
            {
                sendSuccess && (
                    <p> Message Sent successfully</p>
                )
            }
            {
                sendError && (
                    <p className="text-red-500 text-sm text-center">
                        {sendError.message || "Failed to send message"}
                    </p>
                )
            }
        </form>
    </div>
  )
};

export default SendMessageForm ; 
