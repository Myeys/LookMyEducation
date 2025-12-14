import ChatbotIcon from "./ChatbotIcon";
import ReactMarkdown from "react-markdown";

const ChatMessage = ({ chat }) => {
  if (chat.hideInChat) return null;

  const isBot = chat.role === "model";

  return (
    <div className={`message ${isBot ? "bot" : "user"}-message ${chat.isError ? "error" : ""}`}>
      {isBot && <ChatbotIcon />}

      <div className="message-text">
        <ReactMarkdown
          components={{
            a: ({ href, children }) => {
              // Deteksi link YouTube
              const isYouTube =
                href.includes("youtube.com") || href.includes("youtu.be");

              if (isYouTube) {
                const videoId =
                  href.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w\-]+)/)?.[1];

                if (videoId) {
                  return (
                    <div className="youtube-video">
                      <iframe
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title="YouTube Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  );
                }
              }

              return <a href={href}>{children}</a>;
            },
          }}
        >
          {chat.text}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default ChatMessage;
