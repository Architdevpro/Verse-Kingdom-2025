<script>
  async function handleMessage() {
    const input = document.getElementById("userInput");
    const msg = input.value.trim();
    if (msg === "") return;

    const messages = document.getElementById("messages");

    const userMsg = document.createElement("div");
    userMsg.className = "chat-bubble user";
    userMsg.textContent = msg;
    messages.appendChild(userMsg);

    // 💬 Make request to Render backend
    try {
      const response = await fetch("https://quadcore-backend.onrender.com/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: msg }),
      });

      const data = await response.json();

      const botMsg = document.createElement("div");
      botMsg.className = "chat-bubble bot";
      botMsg.textContent = data.reply || "Sorry, something went wrong.";
      messages.appendChild(botMsg);
    } catch (error) {
      const botMsg = document.createElement("div");
      botMsg.className = "chat-bubble bot";
      botMsg.textContent = "Server error 😵. Try again later.";
      messages.appendChild(botMsg);
    }

    input.value = "";
    messages.scrollTop = messages.scrollHeight;
  }
</script>
