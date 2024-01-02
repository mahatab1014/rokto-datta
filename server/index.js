/* eslint-disable no-undef */

const express = require("express");
const app = express();
const cors = require("cors");
const moment = require("moment-timezone");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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

    // Donation Post CRUD Operations
    app.post("/api/v1/posts", async (req, res) => {
      const data = req.body;
      const result = await postCollection.insertOne(data);
      res.send(result).status(200);
    });
    app.get("/api/v1/posts", async (req, res) => {
      const { postType } = req.query;

      try {
        const currentTime = moment().toISOString();
        if (postType === "recent") {
          const data_sort = { posted_at: -1 };
          const recentPosts = await postCollection
            .find()
            .sort(data_sort)
            .toArray();
          const resultData = {
            status: 200,
            message: "ok",
            data: recentPosts,
          };
          res.status(200).send(resultData);
        } else if (postType === "urgent") {
          // filter post type and remove deadline expired posts
          const filter = {
            post_type: postType,
            blood_need_deadline: { $gte: currentTime },
          };
          // sort recent urgent post
          const recentUrgentPost = {
            posted_at: -1,
          };
          const urgentPosts = await postCollection
            .find(filter)
            .sort(recentUrgentPost)
            .toArray();
          const resultData = {
            status: 200,
            message: "ok",
            data: urgentPosts,
          };
          res.status(200).send(resultData);
        } else if (postType === "event") {
          const filter = {
            post_type: postType,
            blood_need_deadline: { $gte: currentTime },
          };
          const eventPosts = await postCollection.find(filter).toArray();
          const resultData = {
            status: 200,
            message: "ok",
            data: eventPosts,
          };
          res.status(200).send(resultData);
        } else {
          const posts = await postCollection.find().toArray();
          const resultData = {
            status: 200,
            message: "ok",
            data: posts,
          };
          res.status(200).send(resultData);
        }
      } catch (err) {
        const resultData = {
          status: 500,
          message: err.message,
          data: [],
        };
        res.status(500).send(resultData);
      }
    });
    app.get("/api/v1/post/:id", async (req, res) => {
      const { id } = req.params;

      if (!ObjectId.isValid(id)) {
        return res.status(400).send({
          status: 400,
          message: "Invalid ObjectId",
        });
      }

      try {
        const filter = { _id: new ObjectId(id) };
        const result = await postCollection.findOne(filter);

        if (!result) {
          // If no post is found with the given ID
          res.status(404).send({
            status: 404,
            message: "Post not found",
            data: null,
          });
        } else {
          // If the post is found
          res.status(200).send({
            status: 200,
            message: "OK",
            data: result,
          });
        }
      } catch (err) {
        // If there's an error in processing the request
        res.status(500).send({
          status: 500,
          message: err.message,
          data: null,
        });
      }
    });
    app.patch("/api/v1/post/:id", async (req, res) => {
      const { id } = req.params;

      if (!ObjectId.isValid(id)) {
        return res.status(400).send({
          status: 400,
          message: "Invalid ObjectId",
        });
      }

      const dataToUpdate = req.body;
      const filter = { _id: new ObjectId(id) };

      try {
        const updatedData = {};

        Object.keys(dataToUpdate).forEach((key) => {
          if (key === "image_info" && typeof dataToUpdate[key] === "object") {
            updatedData[key] = {
              image_url: dataToUpdate[key].image_url,
              md_image_url: dataToUpdate[key].md_image_url,
              image_delete_url: dataToUpdate[key].image_delete_url,
            };
          } else if (dataToUpdate[key]) {
            updatedData[key] = dataToUpdate[key];
          }
        });

        const result = await postCollection.findOneAndUpdate(
          filter,
          { $set: updatedData },
          {
            returnDocument: "after",
          }
        );

        // Handle the result
        if (result) {
          res.status(200).send({
            status: 200,
            message: "Post updated successfully",
          });
        } else {
          res.status(404).send({
            status: 404,
            message: "Post not found",
          });
        }
      } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).send({
          status: 500,
          message: error.message,
          data: null,
        });
      }
    });
    app.delete("/api/v1/posts", async (req, res) => {
      const { id } = req.query;

      if (!ObjectId.isValid(id)) {
        return res.status(400).send({
          status: 400,
          message: "Invalid ObjectId",
        });
      }

      try {
        const filter = { _id: new ObjectId(id) };
        const deletePost = await postCollection.deleteOne(filter);

        if (deletePost.deletedCount > 0) {
          res.status(200).send({
            status: 200,
            message: "Post deleted successfully",
          });
        } else {
          res.status(404).send({
            status: 404,
            message: "Post not found",
          });
        }
      } catch (error) {
        res.status(500).send({
          status: 500,
          message: error.message,
        });
      }
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
