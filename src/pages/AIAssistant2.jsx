import { useState, useRef, useEffect } from "react";
import "./../styles/AIAssistant.css";

const SYSTEM_PROMPT = `You are JIT ShareHub AI Assistant, a smart and friendly AI for students at Jyothy Institute of Technology, Bengaluru. You can help with absolutely anything — coding, academics, general knowledge, current events, creative writing, math, science, life advice, and more. Always give clear, helpful, and student-friendly answers.`;
const QUICK_PROMPTS = [
  { icon: "💻", text: "Explain recursion with an example" },
  { icon: "📚", text: "Summarize DBMS normalization" },
  { icon: "🐛", text: "Debug my code" },
  { icon: "📝", text: "Help me write a project report" },
  { icon: "🎯", text: "Top placement interview tips" },
];

function AIAssistant() {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hey! I'm JIT ShareHub's AI Assistant. I can help you with coding, concepts, project reports, and academic questions. What do you need help with?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const chatRef = useRef(null);
  const history = useRef([]);

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages, loading]);

  const sendMessage = async (text = input) => {
    if (!text.trim() || loading) return;
    setError("");
    setInput("");
    setLoading(true);

    const userMsg = { role: "user", text };
    setMessages(prev => [...prev, userMsg]);
    history.current.push({ role: "user", content: text });

    try {
      const res = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: history.current,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || "API error");

      const reply = data.content?.[0]?.text || "Sorry, no response.";
      history.current.push({ role: "assistant", content: reply });
      setMessages(prev => [...prev, { role: "bot", text: reply }]);

    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="ai-page">

      {/* HERO */}
      <div className="ai-hero">
        <div className="ai-hero-orb orb1"></div>
        <div className="ai-hero-orb orb2"></div>
        <div className="hero-badge">
          <span className="status-dot"></span> AI Assistant · Online
        </div>
        <h1 className="hero-title">🤖 JIT ShareHub AI</h1>
        <p className="hero-sub">Powered by Claude · Ask anything about coding, academics or campus life</p>
      </div>

      <div className="ai-body">

        {/* SIDEBAR */}
        <div className="ai-sidebar">
          <div className="sidebar-title">Quick Prompts</div>
          {QUICK_PROMPTS.map((q, i) => (
            <button key={i} className="quick-btn" onClick={() => sendMessage(q.text)}>
              <span className="qicon">{q.icon}</span>{q.text}
            </button>
          ))}
          <div className="sidebar-note">
            💡 Be specific in your questions for better answers
          </div>
        </div>

        {/* CHAT */}
        <div className="ai-chat">
          <div className="chat-messages" ref={chatRef}>
            {messages.map((m, i) => (
              <div key={i} className={`msg ${m.role}`}>
                <div className="msg-avatar">{m.role === "user" ? "👤" : "🤖"}</div>
                <div className="msg-bubble">
                  {m.text.split("\n").map((line, j) => (
                    <span key={j}>{line}<br /></span>
                  ))}
                </div>
              </div>
            ))}
            {loading && (
              <div className="msg bot">
                <div className="msg-avatar">🤖</div>
                <div className="typing-bubble">
                  <div className="typing-dots">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {error && <div className="error-msg">⚠️ {error}</div>}

          <div className="chat-input-bar">
            <textarea
              className="chat-input"
              rows={1}
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
            />
            <button
              className="send-btn"
              onClick={() => sendMessage()}
              disabled={loading}
            >
              ➤
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AIAssistant;