async function handleMessage() {
  const input = document.getElementById("userInput");
  const msg = input.value.trim();
  if (msg === "") return;

  const messages = document.getElementById("messages");

  // Add user message to the chat
  const userMsg = document.createElement("div");
  userMsg.className = "chat-bubble user";
  userMsg.textContent = msg;
  messages.appendChild(userMsg);

  // Clear input
  input.value = "";

  // Scroll to bottom
  messages.scrollTop = messages.scrollHeight;

  try {
    const response = await fetch("https://your-backend-name.onrender.com/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: msg }),
    });

    const data = await response.json();

    const botMsg = document.createElement("div");
    botMsg.className = "chat-bubble bot";
    botMsg.textContent = data.reply || "Something went wrong!";
    messages.appendChild(botMsg);

    messages.scrollTop = messages.scrollHeight;
  } catch (error) {
    console.error("Error:", error);

    const errorMsg = document.createElement("div");
    errorMsg.className = "chat-bubble bot";
    errorMsg.textContent = "⚠️ Server error. Please try again later.";
    messages.appendChild(errorMsg);
  }
}