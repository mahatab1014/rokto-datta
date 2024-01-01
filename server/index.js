/* eslint-disable no-undef */

const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

// CORS Middleware
const allowedOrigins = {
  origin: ["*", "http://localhost:5173/"],
  optionsSuccessStatus: 200,
};
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());

// MongoDB Configuration
const client = new MongoClient(process.env.MONGO_DB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const database = client.db("RoktoDatta_DB");
    const postCollection = database.collection("donation_posts");

    app.post("/api/v1/create-post", async (req, res) => {
      const data = req.body;
      const result = await postCollection.insertOne(data);
      res.send(result).status(200);
    });

    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
