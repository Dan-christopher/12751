const getNotifications = require("./notificationService");

const weight = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

async function getTopNotifications(limit = 10) {
  const notifications = await getNotifications();

  const sorted = notifications.sort((a, b) => {
    if (weight[b.Type] !== weight[a.Type]) {
      return weight[b.Type] - weight[a.Type];
    }

    return new Date(b.Timestamp) - new Date(a.Timestamp);
  });

  return sorted.slice(0, limit);
}

(async () => {
  const top = await getTopNotifications(10);

  console.log("\nTOP 10 PRIORITY NOTIFICATIONS\n");

  top.forEach((n, index) => {
    console.log(
      `${index + 1}. ${n.Type} | ${n.Message} | ${n.Timestamp}`
    );
  });
})();