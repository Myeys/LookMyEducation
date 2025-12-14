"use client";
import React, { useRef, useEffect, useState } from 'react';
import ChatbotIcon from '../component/ChatbotIcon';
import Chatform from '../component/Chatform';
import ChatMessage from '../component/ChatMessage';
import { companyInfo } from '../component/companyInfo';
import { useAuth } from '../app/context/auth-context';

const Chatbot = () => {
  type ChatMessage = {
    role: "user" | "model";
    text: string;
    isError?: boolean;
    hideInChat?: boolean;
    className?: string;
  };

  const [isHovering, setIsHovering] = useState(false);
  const [isIconHovered, setIsIconHovered] = useState(false);
  const { isLoggedIn, username } = useAuth();
  const audioRef = useRef<HTMLAudioElement>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const [showChatbot, setShowChatbot] = useState<boolean>(false);
  const [hasPlayedAudio, setHasPlayedAudio] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("chatHistory");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    }
  }, [chatHistory]);

  useEffect(() => {
    if (isLoggedIn && username) {
      const savedUsername = localStorage.getItem("chatUsername");
      if (savedUsername !== username) {
        const welcome: ChatMessage[] = [
          { hideInChat: true, role: "model", text: companyInfo },
          { role: "model", text: `Hai ${username} 👋, selamat datang di Look My Education! Saya bisa membantu Anda dengan pertanyaan seputar penyakit menular seksual.` }
        ];
        setChatHistory(welcome);
        localStorage.setItem("chatHistory", JSON.stringify(welcome));
        localStorage.setItem("chatUsername", username);
      }
    }
  }, [username, isLoggedIn]);

  const isPMSQuestion = (question: string) => {
    return /(hiv|aids|gonore|klamidia|sifilis|herpes|hpv|pms|ims|penyakit menular seksual)/i.test(question);
  };

const generateBotResponse = async (history: ChatMessage[]) => {
  const lastUserMessage = history.filter(h => h.role === "user").pop()?.text;
  if (!lastUserMessage) return;

  // Saat user bertanya → tampilkan efek "bot sedang mengetik..."
  setChatHistory(prev => [
    ...prev,
    { role: "model", text: "..." } // indikator bot sedang berpikir
  ]);

  // Delay seakan bot sedang berpikir
  await new Promise(resolve => setTimeout(resolve, 900));

  // Hapus indikator "..."
  setChatHistory(prev => prev.filter(m => m.text !== "..."));

  // =======================
  // 1. DETEKSI VIDEO
  // =======================
  if (lastUserMessage.toLowerCase().includes("video")) {
    const videoLinks = {
      gonore: "https://www.youtube.com/watch?v=3l4SU8tp0fQ",
      hiv: "https://www.youtube.com/watch?v=dAXmTtWTirw",
      klamidia: "https://www.youtube.com/watch?v=e_YtnzeuhTU",
      sifilis: "https://www.youtube.com/watch?v=lzNRZ_musBA",
      "vaginosis bakterial": "https://www.youtube.com/watch?v=UOvOBqL-PH0",
      "herpes genital": "https://www.youtube.com/watch?v=3DpmR0GMboE",
      hpv: "https://www.youtube.com/watch?v=yo8sSQ9Spg4",
      trikomoniasis: "https://www.youtube.com/watch?v=KX-33xbMh48",
    };

    const found = Object.entries(videoLinks).find(([key]) =>
      lastUserMessage.toLowerCase().includes(key)
    );

    if (found) {
      const [penyakit, link] = found;

      return setChatHistory(prev => [
        ...prev,
        {
          role: "model",
          text: `Pertanyaan bagus, ${username}! 😊\n\nBerikut video tentang **${penyakit.toUpperCase()}**:\n\n[${link}](${link})`
        }
      ]);
    }
  }

  // =======================
  // 2. DETEKSI SALAM
  // =======================
  const greetings = ["hai", "hallo", "halo", "hello", "hi"];
  const normalized = lastUserMessage.replace(/[^a-zA-Z]/g, "").toLowerCase();

  if (greetings.includes(normalized)) {
    return setChatHistory(prev => [
      ...prev,
      {
        role: "model",
        text: `Hai ${username}! 👋 Ada yang bisa saya bantu seputar PMS?`
      }
    ]);
  }

  // =======================
  // 3. DETEKSI NON-PMS
  // =======================
  if (!isPMSQuestion(lastUserMessage)) {
    return setChatHistory(prev => [
      ...prev,
      {
        role: "model",
        text: `Pertanyaan bagus, ${username}! Tetapi saya hanya dapat menjawab seputar **penyakit menular seksual** ya.`
      }
    ]);
  }

  // =======================
  // 4. AMBIL JAWABAN DARI API LOCAL / JSON
  // =======================
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: lastUserMessage }),
    });

    const data = await response.json();

    setChatHistory(prev => [
      ...prev,
      {
        role: "model",
        text: `Pertanyaan bagus, ${username}! 👍\n\n${data.answer}`
      }
    ]);
  } catch (err) {
    setChatHistory(prev => [
      ...prev,
      {
        role: "model",
        text: `Maaf ${username}, terjadi gangguan saat memproses pertanyaan.`,
        isError: true,
      }
    ]);
  }
};


  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory]);

  useEffect(() => {
    if (showChatbot && !hasPlayedAudio) {
      audioRef.current?.play().catch(err => {
        console.warn("Gagal memutar audio:", err);
      });
      setHasPlayedAudio(true);
    }
  }, [showChatbot, hasPlayedAudio]);

  if (!isLoggedIn) return null;

  return (
    <>
      <div className={`chatbot ${showChatbot ? "show-chatbot" : ""}`}>
        {!showChatbot && !isIconHovered && (
          <div className="chatbot-hint-bubble">
            Ingin tahu lebih banyak?<br /> tanya <strong>BOT LME</strong>
          </div>
        )}

        <button
          onClick={() => setShowChatbot(prev => !prev)}
          id="chatbot-toggler"
          onMouseEnter={() => setIsIconHovered(true)}
          onMouseLeave={() => setIsIconHovered(false)}
        >
          <span className="material-symbols-outlined"><ChatbotIcon /></span>
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="chatbot-popup">
          <div className="chat-header">
            <div className="header-info">
              <ChatbotIcon />
              <h2 className="logo-text">SELAMAT DATANG DI BOT LME</h2>
            </div>
          </div>

          <div ref={chatBodyRef} className="chat-body">
            {chatHistory
              .filter(chat => !chat.hideInChat)
              .map((chat, index) => (
                <ChatMessage key={index} chat={chat} />
              ))}
          </div>

          <div className="chat-footer">
            <Chatform
              chatHistory={chatHistory}
              setChatHistory={setChatHistory}
              generateBotResponse={generateBotResponse}
            />
          </div>

          <button
            onClick={() => {
              const sapaanAwal = chatHistory.filter(
                (msg) => msg.hideInChat === true
              );
              setChatHistory(sapaanAwal);
              localStorage.setItem("chatHistory", JSON.stringify(sapaanAwal));
            }}
            style={{
              margin: "0px auto 5px auto",
              padding: "6px 12px",
              background: "black",
              border: "1px solid #ccc",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "10px"
            }}
          >
            Hapus Riwayat Chat
          </button>
        </div>
      </div>
      <audio ref={audioRef} src="/audio/sapaan-cewe.opus" preload="auto" />
    </>
  );
};

export default Chatbot;