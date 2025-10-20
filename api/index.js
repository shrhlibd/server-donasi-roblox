import express from "express";

const app = express();

app.use(express.json());

// Endpoint untuk health check (pemeriksaan kondisi) oleh UptimeRobot
app.get("/", (request, response) => {
  response.status(200).send("Server is up and running!");
});

let latestDonation = {};

app.post("/webhook", (request, response) => {
  console.log("Webhook diterima! Data:", request.body);
  const data = request.body;
  latestDonation = {
    id: data.id || Date.now(),
    name: data.donator_name || "Hamba Tuhan",
    amount: data.amount || 0,
    message: data.message || "Semoga bermanfaat!"
  };
  response.status(200).send("OK");
});

app.get("/get-latest-donation", (request, response) => {
  response.json(latestDonation);
  latestDonation = {};
});

// Ini bagian yang diubah agar cocok dengan Vercel
export default app;