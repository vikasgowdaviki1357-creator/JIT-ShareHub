import { useState } from "react";
import "./../styles/AIAssistant.css";
import { askGemini } from "../services/gemini";

function AIAssistant() {

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  const handleAsk = async () => {

    if (!question.trim()) return;

    const userQuestion = question;
    const query = userQuestion.toLowerCase().trim();

    setMessages(prev => [
      ...prev,
      {
        type: "user",
        text: userQuestion
      }
    ]);

    setQuestion("");

    // ===== Navigation Commands =====

    if (
      query.includes("placements") ||
      query.includes("open placements")
    ) {

      setMessages(prev => [
        ...prev,
        {
          type: "ai",
          text: "🎯 Opening Placements..."
        }
      ]);

      setTimeout(() => {
        window.location.href = "/placements";
      }, 1000);

      return;
    }

    if (
      query.includes("events") ||
      query.includes("show events")
    ) {

      setMessages(prev => [
        ...prev,
        {
          type: "ai",
          text: "🎉 Opening Events..."
        }
      ]);

      setTimeout(() => {
        window.location.href = "/events";
      }, 1000);

      return;
    }

    if (
      query.includes("dashboard") ||
      query.includes("open dashboard")
    ) {

      setMessages(prev => [
        ...prev,
        {
          type: "ai",
          text: "🏠 Opening Dashboard..."
        }
      ]);

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);

      return;
    }

    if (
      query.includes("marketplace") ||
      query.includes("open marketplace")
    ) {

      setMessages(prev => [
        ...prev,
        {
          type: "ai",
          text: "🛒 Opening Marketplace..."
        }
      ]);

      setTimeout(() => {
        window.location.href = "/marketplace";
      }, 1000);

      return;
    }

    if (
      query.includes("resources") ||
      query.includes("open resources")
    ) {

      setMessages(prev => [
        ...prev,
        {
          type: "ai",
          text: "📚 Opening Resources..."
        }
      ]);

      setTimeout(() => {
        window.location.href = "/resources";
      }, 1000);

      return;
    }

    if (
      query.includes("my products")
    ) {

      setMessages(prev => [
        ...prev,
        {
          type: "ai",
          text: "📦 Opening My Products..."
        }
      ]);

      setTimeout(() => {
        window.location.href = "/my-products";
      }, 1000);

      return;
    }

    try {

      // ===== Product Search =====

      const products =
        JSON.parse(localStorage.getItem("products")) || [];

      const matchedProducts = products.filter(product =>
        product.itemName
          ?.toLowerCase()
          .includes(query)
      );

      if (matchedProducts.length > 0) {

        const result = matchedProducts
          .map(product =>
            `📦 ${product.itemName}
💰 ₹${product.price}
🏷️ ${product.branch}
📞 ${product.phone || "Not Available"}`
          )
          .join("\n\n");

        setMessages(prev => [
          ...prev,
          {
            type: "ai",
            text: result
          }
        ]);

        return;
      }

      // ===== Resource Search =====

      const resources =
        JSON.parse(localStorage.getItem("resources")) || [];

      const matchedResources = resources.filter(resource =>
        resource.title
          ?.toLowerCase()
          .includes(query)
      );

      if (matchedResources.length > 0) {

        const result = matchedResources
          .map(resource =>
            `📚 ${resource.title}
🏷️ ${resource.branch}`
          )
          .join("\n\n");

        setMessages(prev => [
          ...prev,
          {
            type: "ai",
            text: result
          }
        ]);

        return;
      }

      // ===== Gemini =====

      const aiResponse = await askGemini(`
You are JIT ShareHub AI Assistant.

Features:
- Dashboard
- Marketplace
- Resources
- Placements
- Events
- My Products

Answer professionally.

Question:
${userQuestion}
`);

      setMessages(prev => [
        ...prev,
        {
          type: "ai",
          text: aiResponse
        }
      ]);

    } catch (error) {

      console.log(error);

      setMessages(prev => [
        ...prev,
        {
          type: "ai",
          text:
            "⚠️ Gemini is busy right now. Please try again in a few seconds."
        }
      ]);
    }
  };

  return (
    <div className="chat-page">

      <div className="chat-container">

        <h1>🤖 JIT AI Assistant</h1>

        <div className="chat-box">

          {messages.length === 0 && (
            <div className="welcome-message">
              Ask coding, placement, project,
              resource or marketplace questions.
            </div>
          )}

          {messages.map((msg, index) => (

            <div
              key={index}
              className={
                msg.type === "user"
                  ? "message-row user-row"
                  : "message-row ai-row"
              }
            >

              <div className="avatar">
                {msg.type === "user" ? "👤" : "🤖"}
              </div>

              <div
                className={
                  msg.type === "user"
                    ? "user-message"
                    : "ai-message"
                }
              >
                {msg.text}
              </div>

            </div>

          ))}

        </div>

        <div className="input-area">

          <textarea
            placeholder="Ask anything..."
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
          />

          <button onClick={handleAsk}>
            Send
          </button>

        </div>

      </div>

    </div>
  );
}

export default AIAssistant;