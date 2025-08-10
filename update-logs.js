const fs = require("fs");

const payload = JSON.parse(process.env.PAYLOAD);
const logs = JSON.parse(fs.readFileSync("logs.json", "utf8"));

if (payload.action === "toggleMaintenance") {
  logs.maintenance = !logs.maintenance;
  logs.actionsLog.push({
    time: new Date().toISOString(),
    admin: payload.admin,
    action: logs.maintenance ? "Enabled maintenance" : "Disabled maintenance"
  });
}

if (payload.action === "forceRefresh") {
  logs.forceRefresh = true;
  logs.actionsLog.push({
    time: new Date().toISOString(),
    admin: payload.admin,
    action: "Forced refresh"
  });
}

if (payload.action === "suggestBan") {
  logs.banSuggestions.push(payload.player);
  logs.actionsLog.push({
    time: new Date().toISOString(),
    admin: payload.admin,
    action: `Suggested ban: ${payload.player}`
  });
}

fs.writeFileSync("logs.json", JSON.stringify(logs, null, 2));
console.log("Logs updated.");
