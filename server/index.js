/* eslint-disable no-undef */

const express = require("express");
const app = express();
const cors = require("cors");
const moment = require("moment-timezone");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

// Email
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);

const mg = mailgun.client({
  username: "api",
  key: process.env.MAIL_GUN_API_KEY,
});

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
    const commentsCollection = database.collection("donation_comments");
    const usersCollection = database.collection("users");

    // Donation Post CRUD Operations
    app.post("/api/v1/posts", async (req, res) => {
      const data = req.body;
      const result = await postCollection.insertOne(data);
      const filterUser = { blood_group: data?.blood_group };
      const userResult = await usersCollection.find(filterUser).toArray();
      const userEmails = userResult?.map((user) => user?.email);

      // Send email existing user
      mg.messages
        .create(process.env.MAIL_GUN_SendingDomain, {
          from: "Rokto Datta <postmaster@sandboxb3f9880011bd4afdb1d9ca558f71c0eb.mailgun.org>",
          to: userEmails,
          subject: `Urgent Blood Donation Request - ${data?.blood_group}`,
          html: `<!doctype html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><title></title><!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]--><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style type="text/css">#outlook a { padding:0; }
          body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
          table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
          img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
          p { display:block;margin:13px 0; }</style><!--[if mso]>
        <noscript>
        <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        </noscript>
        <![endif]--><!--[if lte mso 11]>
        <style type="text/css">
          .mj-outlook-group-fix { width:100% !important; }
        </style>
        <![endif]--><!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css"><style type="text/css">@import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);</style><!--<![endif]--><style type="text/css">@media only screen and (min-width:480px) {
        .mj-column-per-100 { width:100% !important; max-width: 100%; }
      }</style><style media="screen and (min-width:480px)">.moz-text-html .mj-column-per-100 { width:100% !important; max-width: 100%; }</style><style type="text/css"></style></head><body style="word-spacing:normal;"><div><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tbody><tr><td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"><p style="border-top:solid 4px #F45E43;font-size:1px;margin:0px auto;width:100%;"></p><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 4px #F45E43;font-size:1px;margin:0px auto;width:550px;" role="presentation" width="550px" ><tr><td style="height:0;line-height:0;"> &nbsp;
</td></tr></table><![endif]--></td></tr><tr><td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;">Dear Rokto Datta,</div></td></tr><tr><td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;">I hope this email finds you well. Your commitment to saving lives as a registered blood donor on RaktoDatta has made a significant impact on our community.</div></td></tr><tr><td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;">We are reaching out to you with an urgent request for blood donation. A fellow member of our community is currently in need of blood, and your blood type ${
            data?.blood_group
          } matches the requirement.</div></td></tr><tr><td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;">Details of the patient and the blood donation request:</div></td></tr><tr><td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;"><strong>Patient's Name:</strong> ${
            data?.author?.name
          }<br><strong>Hospital:</strong> ${
            data?.hospital_name
          }<br><strong>Blood Type Required:</strong> ${
            data?.blood_group
          }<br><strong>Date and Time of Donation:</strong> ${moment(
            data?.blood_need_deadline
          ).format(
            "DD, MM, YYYY | h:mm a"
          )}<br></div></td></tr><tr><td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;">Your willingness to donate could make a life-saving difference. If you are available and willing to donate, please reply to this email or contact the hospital directly at ${
            data?.phone_number
          }.</div></td></tr><tr><td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;">Your generosity and compassion as a blood donor are invaluable, and we appreciate your dedication to helping those in need. Thank you for being a beacon of hope in our community.</div></td></tr><tr><td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;">If you have any questions or need further assistance, please don't hesitate to contact us.</div></td></tr><tr><td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;">Thank you for your ongoing support.</div></td></tr><tr><td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;">Best regards,<br><strong>RaktoDatta Team</strong><br>E-mail: mhsudip815@gmail.com<br><a href="https://rokto-datta.web.app">rokto-datta.web.app</a><br></div></td></tr><tr><td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:helvetica;font-size:20px;line-height:1;text-align:left;color:#F45E43;"></div></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></div></body></html>`,
        })
        .then((msg) => console.log(msg)) // logs response data
        .catch((err) => console.log(err)); // logs any error`;

      res.send(result).status(200);
    });
    app.get("/api/v1/posts", async (req, res) => {
      const { postType, page, size } = req.query;

      const pageNumber = parseInt(page) || 0;
      const sizeNumber = parseInt(size) || 10;
      const skip = pageNumber * sizeNumber;
      const limit = sizeNumber;

      try {
        const currentTime = moment().toISOString();
        if (postType === "recent") {
          const data_sort = { posted_at: -1 };
          const totalRecentPost = await postCollection.estimatedDocumentCount();
          const recentPosts = await postCollection
            .find()
            .skip(skip)
            .limit(limit)
            .sort(data_sort)
            .toArray();
          const resultData = {
            status: 200,
            message: "ok",
            data_count: totalRecentPost,
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
          const urgentPostsCount = await postCollection.countDocuments(filter);
          const urgentPosts = await postCollection
            .find(filter)
            .skip(skip)
            .limit(limit)
            .sort(recentUrgentPost)
            .toArray();
          const resultData = {
            status: 200,
            message: "ok",
            data_count: urgentPostsCount,
            data: urgentPosts,
          };
          res.status(200).send(resultData);
        } else if (postType === "event") {
          const filter = {
            post_type: postType,
            blood_need_deadline: { $gte: currentTime },
          };
          const eventPostsCount = await postCollection.countDocuments(filter);
          const eventPosts = await postCollection.find(filter).toArray();
          const resultData = {
            status: 200,
            message: "ok",
            data_count: eventPostsCount,
            data: eventPosts,
          };
          res.status(200).send(resultData);
        } else {
          const totalPosts = await postCollection.estimatedDocumentCount();
          const posts = await postCollection
            .find()
            .skip(skip)
            .limit(limit)
            .toArray();
          const resultData = {
            status: 200,
            message: "ok",
            data_count: totalPosts,
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

    // Comments
    app.post("/api/v1/comments", async (req, res) => {
      const data = req.body;
      const result = await commentsCollection.insertOne(data);
      res.status(200).send(result);
    });
    app.get("/api/v1/comments/:id", async (req, res) => {
      const { id } = req.params;
      try {
        const filter = { post_id: id };
        const getComments = await commentsCollection
          .find(filter)
          .sort({ published_at: -1 })
          .toArray();
        const resultData = {
          status: 200,
          message: "ok",
          data: getComments,
        };
        res.status(200).send(resultData);
      } catch (error) {
        const resultData = {
          status: 500,
          message: error.message,
          data: [],
        };
        res.status(500).send(resultData);
      }
    });

    // Users CRUD Operations
    app.patch("/api/v1/users", async (req, res) => {
      const data = req.body;
      const { uid } = req.query;
      const filteredData = Object.keys(data).reduce((acc, key) => {
        const value = data[key];

        if (
          value !== undefined &&
          value !== null &&
          !(typeof value === "string" && value.length < 1)
        ) {
          acc[key] = value;
        }

        return acc;
      }, {});

      try {
        const filter = { uid: uid };
        const options = { upsert: true };
        const updateDoc = {
          $set: filteredData,
        };
        const result = await usersCollection.findOneAndUpdate(
          filter,
          updateDoc,
          options
        );

        const resultData = {
          status: 200,
          message: "ok",
          data: result,
        };
        res.status(200).send(resultData);
      } catch (error) {
        console.log(error.message);
        res.status(500).send({
          status: 500,
          message: error.message,
          data: null,
        });
      }
    });
    app.get("/api/v1/users", async (req, res) => {
      const { id } = req.query;
      if (!ObjectId.isValid(id)) {
        return res.status(400).send({
          status: 400,
          message: "Invalid ObjectId",
        });
      }
      const filter = { _id: new ObjectId(id) };
      try {
        const result = await usersCollection.findOne(filter);
        const data = {
          status: 200,
          message: "ok",
          data: result,
        };
        res.status(200).send(data);
      } catch (error) {
        res.status(500).send({
          status: 500,
          message: error.message,
          data: null,
        });
      }
    });
    app.get("/api/v1/donors", async (req, res) => {
      const filter = { role: "donor" };
      try {
        const result = await usersCollection.find(filter).toArray();
        const data = {
          status: 200,
          message: "ok",
          data: result,
        };
        res.status(200).send(data);
      } catch (error) {
        res.status(500).send({
          status: 500,
          message: error.message,
          data: null,
        });
      }
    });
    app.get("/api/v1/role", async (req, res) => {
      const { uid } = req.query;
      try {
        const filter = { uid: uid };
        const userInfo = await usersCollection.findOne(filter);
        const data = {
          status: 200,
          message: userInfo === null ? "user not found" : "ok",
          role: userInfo?.role || "user",
        };
        res.status(200).send(data);
      } catch (error) {
        res.status(500).send({
          status: 500,
          message: error.message,
          data: null,
        });
      }
    });

    // DASHBOARD CURD OPERATIONS
    app.get("/api/v1/user-info", async (req, res) => {
      const { uid } = req.query;
      try {
        const filterUser = { uid: uid };
        const filterTotalPosts = { "author.uid": uid };

        const totalPosts = await postCollection.countDocuments(
          filterTotalPosts
        );
        const userInfo = await usersCollection.findOne(filterUser);
        const data = {
          status: 200,
          message: userInfo === null ? "user not found" : "ok",
          total_posts: totalPosts,
          user_info: userInfo,
        };
        res.status(200).send(data);
      } catch (error) {
        res.status(500).send({
          status: 500,
          message: error.message,
          data: null,
        });
      }
    });
    app.get("/api/v1/user-post-info", async (req, res) => {
      const { uid, page, size } = req.query;
      const pageNumber = parseInt(page) || 0;
      const sizeNumber = parseInt(size) || 10;
      const skip = pageNumber * sizeNumber;
      const limit = sizeNumber;

      try {
        const filter = { "author.uid": uid };
        const result = await postCollection
          .find(filter)
          .skip(skip)
          .limit(limit)
          .toArray();
        const totalData = await postCollection.countDocuments(filter);
        const data = {
          status: 200,
          message: "ok",
          total_data: totalData,
          data: result,
        };
        res.status(200).send(data);
      } catch (error) {
        res.status(500).send({
          status: 500,
          message: error.message,
          data: null,
        });
      }
    });
    app.delete("/api/v1/user-post-info/:id", async (req, res) => {
      const { id } = req.params;
      if (!ObjectId.isValid(id)) {
        return res.status(400).send({
          status: 400,
          message: "Invalid ObjectId",
        });
      }
      try {
        const filter = { _id: new ObjectId(id) };
        const result = await postCollection.deleteOne(filter);
        if (result.deletedCount === 1) {
          const data = {
            status: 200,
            message: "Post Deleted",
            delete: true,
          };
          res.status(200).send(data);
        } else {
          const data = {
            status: 200,
            message: "Post not found",
            delete: false,
          };
          res.status(200).send(data);
        }
      } catch (error) {
        res.status(500).send({
          status: 500,
          message: error.message,
          data: null,
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
