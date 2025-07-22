const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { streamToString } = require("../utils/streamToString");

const s3Client = new S3Client({ region: process.env.AWS_REGION });

async function getFeedFromS3() {
  const command = new GetObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: "feed.json",
  });
  const response = await s3Client.send(command);
  const jsonString = await streamToString(response.Body);
  return JSON.parse(jsonString);
}

module.exports = { getFeedFromS3 };