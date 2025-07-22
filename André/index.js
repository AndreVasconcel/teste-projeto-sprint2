const { parseAndSaveToS3 } = require("./services/rssService");
const { getFeedFromS3 } = require("./services/s3Service");
const express = require("express");
const path = require("path");
const compression = require("compression");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;
const urlRSS = "https://res.stj.jus.br/hrestp-c-portalp/RSS.xml";

app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

app.get("/latest-date", async (req, res) => {
  const feed = await getFeedFromS3();
  const items = feed.items || [];
  const mostRecentDate = items
    .map(item => new Date(item.pubDate))
    .reduce((latest, current) => current > latest ? current : latest);

  res.json({
    mostRecentDate: mostRecentDate.toISOString(),
  });
});

app.get("/update-rss", async (req, res) => {
  await parseAndSaveToS3(urlRSS);
  res.send("Feed atualizado e enviado para o S3.");
});

app.get("/edital-texts", async (req, res) => {
  const feed = await getFeedFromS3();
  const items = feed.items || [];
  const textosComEdital = items
    .filter(item =>
      item.contentText &&
      item.contentText.toLowerCase().includes("edital")
    )
    .map(item => item.contentText);

  res.json({
    count: textosComEdital.length,
    textos: textosComEdital,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});