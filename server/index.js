/* eslint-disable no-undef */

const express = require("express");
const app = express();
const cors = require("cors");
const moment = require("moment-timezone");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

// NodeMailer
const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASS_KEY,
  },
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

      let mailOptions = {
        from: "Rokto Datta <mhsudip815@gmail.com>", // TODO: email sender
        to: userEmails, // TODO: email receiver
        subject: `Urgent Blood Donation Request - ${data?.blood_group}`,
        html: `<!doctypehtml><html xmlns=http://www.w3.org/1999/xhtml xmlns:o=urn:schemas-microsoft-com:office:office xmlns:v=urn:schemas-microsoft-com:vml><meta content="text/html; charset=UTF-8"http-equiv=Content-Type><meta content="width=device-width,initial-scale=1"name=viewport><meta name=x-apple-disable-message-reformatting><meta content="IE=edge"http-equiv=X-UA-Compatible><title>Urgent Blood Donation Request - ${
          data?.blood_group
        }</title><style>@media only screen and (min-width:520px){.u-row{width:500px!important}.u-row .u-col{vertical-align:top}.u-row .u-col-100{width:500px!important}}@media (max-width:520px){.u-row-container{max-width:100%!important;padding-left:0!important;padding-right:0!important}.u-row .u-col{min-width:320px!important;max-width:100%!important;display:block!important}.u-row{width:100%!important}.u-col{width:100%!important}.u-col>div{margin:0 auto}}body{margin:0;padding:0}table,td,tr{vertical-align:top;border-collapse:collapse}p{margin:0}.ie-container table,.mso-container table{table-layout:fixed}*{line-height:inherit;box-sizing:border-box}a[x-apple-data-detectors=true]{color:inherit!important;text-decoration:none!important}table,td{color:#000}#u_body a{color:#00e;text-decoration:underline}@media (max-width:480px){#u_content_image_1 .v-src-width{width:auto!important}#u_content_image_1 .v-src-max-width{max-width:25%!important}}</style><body class="clean-body u_body"style=margin:0;padding:0;-webkit-text-size-adjust:100%;background-color:#e7e7e7;color:#000><table cellpadding=0 cellspacing=0 style="border-collapse:collapse;table-layout:fixed;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0;vertical-align:top;min-width:320px;margin:0 auto;background-color:#e7e7e7;width:100%"id=u_body><tr style=vertical-align:top><td style=word-break:break-word;border-collapse:collapse!important;vertical-align:top><div style=padding:0;background-color:transparent class=u-row-container><div style="margin:0 auto;min-width:320px;max-width:500px;overflow-wrap:break-word;word-wrap:break-word;word-break:break-word;background-color:transparent"class=u-row><div style=border-collapse:collapse;display:table;width:100%;height:100%;background-color:transparent><div style=max-width:320px;min-width:500px;display:table-cell;vertical-align:top class="u-col u-col-100"><div style=height:100%;width:100%!important;border-radius:0;-webkit-border-radius:0;-moz-border-radius:0><div style="box-sizing:border-box;height:100%;padding:0;border-top:0 solid transparent;border-left:0 solid transparent;border-right:0 solid transparent;border-bottom:0 solid transparent;border-radius:0;-webkit-border-radius:0;-moz-border-radius:0"><table cellpadding=0 cellspacing=0 border=0 width=100% style=font-family:arial,helvetica,sans-serif role=presentation id=u_content_image_1><tr><td style=overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif align=left><table cellpadding=0 cellspacing=0 border=0 width=100%><tr><td style=padding-right:0;padding-left:0 align=center><a href=https://rokto-datta.web.app target=_blank><img align=center alt=""border=0 class="v-src-max-width v-src-width"src=https://i.ibb.co/Gk5wMps/rokto-datta-ban.png style=outline:0;text-decoration:none;-ms-interpolation-mode:bicubic;clear:both;display:inline-block!important;border:none;height:auto;float:none;width:25%;max-width:120px width=120></a></table></table><table cellpadding=0 cellspacing=0 border=0 width=100% style=font-family:arial,helvetica,sans-serif role=presentation><tr><td style=overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif align=left><table cellpadding=0 cellspacing=0 border=0 width=100% style="border-collapse:collapse;table-layout:fixed;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0;vertical-align:top;border-top:1px solid #bbb;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"align=center height=0px><tr style=vertical-align:top><td style=word-break:break-word;border-collapse:collapse!important;vertical-align:top;font-size:0;line-height:0;mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%><span> </span></table></table><table cellpadding=0 cellspacing=0 border=0 width=100% style=font-family:arial,helvetica,sans-serif role=presentation><tr><td style=overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif align=left><div style=font-size:14px;line-height:140%;text-align:left;word-wrap:break-word><p style=line-height:140%>Dear Rokto Datta,</p><br><p style=line-height:140%>I hope this email finds you well. Your commitment to saving lives as a registered blood donor on RaktoDatta has made a significant impact on our community.</p><br><p style=line-height:140%>We are reaching out to you with an urgent request for blood donation. A fellow member of our community is currently in need of blood, and your blood type ${
          data?.blood_group
        } matches the requirement.</p><br><p style=line-height:140%>Details of the patient and the blood donation request:</p><br><div><ul style=list-style:none;padding-left:0><li><strong>Patient's Name:</strong> ${
          data?.author?.name
        }<li><strong>Hospital:</strong> ${
          data?.hospital_name
        }<li><strong>Blood Type Required:</strong> ${
          data?.blood_group
        }<li><strong>Date and Time of Donation:</strong> ${moment(
          data?.blood_need_deadline
        ).format(
          "DD,MM, YYYY | h:mm a"
        )}</ul></div><div><p style=line-height:140%>Your willingness to donate could make a life-saving difference. If you are available and willing to donate, please reply to this email or contact the hospital directly at ${
          data?.phone_number
        }.</p><br></div><div><p style=line-height:140%>Your generosity and compassion as a blood donor are invaluable, and we appreciate your dedication to helping those in need. Thank you for being a beacon of hope in our community.</p><br></div><div><p style=line-height:140%>If you have any questions or need further assistance, please don't hesitate to contact us.</p><br><p style=line-height:140%>Thank you for your ongoing support.</p><br>Best regards,<br><strong>Team RaktoDatta</strong><br><a href=mailto:mhsudip815@gmail.com target=_blank rel=noopener>mhsudip815@gmail.com</a><br><a href=https://rokto-datta.web.app/ target=_blank rel=noopener data-saferedirecturl="https://www.google.com/url?q=https://rokto-datta.web.app&source=gmail&ust=1705297758200000&usg=AOvVaw0xXukfPi1UJVI1gv0EKOdn">rokto-datta.web.app</a> <br><br></div></div></table></div></div></div></div></div></div></table>`,
      };
      transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
          return console.log("Error occurs");
        }
        return console.log("Email sent!!!");
      });

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
