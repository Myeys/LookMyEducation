import { useRef, FormEvent } from 'react';

interface ChatformProps {
  chatHistory: Array<{
    role: "user" | "model";
    text: string;
  }>;
  setChatHistory: (history: any) => void;
  generateBotResponse: (history: any) => void;
}

const Chatform = ({ 
  chatHistory, 
  setChatHistory, 
  generateBotResponse 
}: ChatformProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const message = inputRef.current?.value.trim();
    if (!message) return;

    const newMessage = { 
      role: "user" as const, 
      text: message,
      className: message.length > 50 ? "long-message" : ""
    };
    
    const updatedHistory = [...chatHistory, newMessage];
    setChatHistory(updatedHistory);
    generateBotResponse(updatedHistory);
    
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="chat-form">
      <input
        ref={inputRef}
        type="text"
        placeholder="Tanya tentang penyakit menular seksual..."
        required
        className="message-input"
        aria-label="Masukkan pertanyaan"
      />
      <button 
        type="submit" 
        className="send-button"
        aria-label="Kirim pertanyaan"
      >
        Kirim
      </button>
    </form>
  );
};

export default Chatform;