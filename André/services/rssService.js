const RSSParser = require("rss-parser");
const { htmlToText } = require("html-to-text");
const fs = require("fs");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({ region: process.env.AWS_REGION });

const formatFeedData = (feed) => {
  return {
    title: feed.title,
    items: feed.items.map((item) => {
      const htmlContent =
        item["content:encoded"] || item.contentEncoded || item.content || "";
      let cleanText = htmlToText(htmlContent, {
        wordwrap: false,
        ignoreHref: true,
        ignoreImage: true,
        preserveNewlines: false,
      });
      cleanText = cleanText
        .replace(/\\[rn]|[\r\n\t]+/g, " ")
        .replace(/\s{2,}/g, " ")
        .trim();

      return {
        title: item.title,
        pubDate: item.pubDate,
        contentText: cleanText,
      };
    }),
  };
};

const parseAndSaveToS3 = async (url) => {
  const parser = new RSSParser();
  const feed = await parser.parseURL(url);

  const data = formatFeedData(feed);
  const jsonString = JSON.stringify(data, null, 2);

  fs.writeFileSync("feed.json", jsonString, "utf8");
  console.log("✅ Arquivo feed.json extraido.");

  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: "feed.json",
    ContentType: "application/json",
    Body: jsonString,
  });

  const uploadResponse = await s3Client.send(command);
  console.log("✅ Upload para o S3 feito com sucesso:", uploadResponse);
};

module.exports = { parseAndSaveToS3 };