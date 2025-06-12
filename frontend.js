async function handleMessage() {
  const input = document.getElementById("userInput");
  const msg = input.value.trim();
  if (msg === "") return;

  const messages = document.getElementById("messages");

  // Show user message
  const userMsg = document.createElement("div");
  userMsg.className = "chat-bubble user";
  userMsg.textContent = msg;
  messages.appendChild(userMsg);

  // Send message to backend
  try {
    const response = await fetch("https://quadcore-backend.onrender.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: msg })
    });

    const data = await response.json();
    const botMsg = document.createElement("div");
    botMsg.className = "chat-bubble bot";
    botMsg.textContent = data.reply;
    messages.appendChild(botMsg);
  } catch (error) {
    const errorMsg = document.createElement("div");
    errorMsg.className = "chat-bubble bot";
    errorMsg.textContent = "Error talking to QuadCore Support bot.";
    messages.appendChild(errorMsg);
  }

  input.value = "";
  messages.scrollTop = messages.scrollHeight;
}