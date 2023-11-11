// Import necessary modules and set up Express
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

// MongoDB connection setup (replace the connection string with your actual MongoDB connection string)
mongoose.connect("mongodb+srv://pes1202201377:lisanlisan@cluster0.buvuxr1.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected successfully");

    // Define a mongoose model for your content
    const Content = mongoose.model("Content", {
      title: String,
      content: String,
      imageUrl: String,
      date: Date,
      username: String,
      upvotes: Number,
      IsPost: Number
    }, 'user123'); // Specify the collection name as 'user123'

    // Handle the POST request for saving content
    app.post("/saveContent", async (req, res) => {
      try {
        // Destructure fields from the request body
        const { title, content, imageUrl } = req.body;

        // Check if title and content are present
        if (!title || !content) {
          return res.status(400).json({ message: "Title and content are required fields." });
        }

        // Create a new Content document with user-specific data
        const newContent = new Content({
          title,
          content,
          imageUrl,
          date: new Date(),
          username: 'user123', // Replace with the actual username or fetch it from the user's session
          upvotes: 0, // You might want to start with 0 upvotes or fetch this from the user's data
          IsPost : 1,
        });

        // Save the document to the MongoDB collection
        await newContent.save();

        res.json({ message: "Content saved successfully" });
      } catch (error) {
        console.error("Error saving content:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });

    // Handle the POST request for saving drafts
    app.post("/saveDraft", async (req, res) => {
      try {
        // Destructure fields from the request body
        const { title, content, imageUrl } = req.body;

        // Check if title and content are present
        if (!title || !content) {
          return res.status(400).json({ message: "Title and content are required fields." });
        }

        // Create a new Content document with user-specific data for draft
        const newContent = new Content({
          title,
          content,
          imageUrl,
          date: new Date(),
          username: 'user123', // Replace with the actual username or fetch it from the user's session
          upvotes: 0, // You might want to start with 0 upvotes or fetch this from the user's data
          IsPost: 0, // Set to 0 for drafts
        });

        // Save the document to the MongoDB collection
        await newContent.save();

        res.json({ message: "Draft saved successfully" });
      } catch (error) {
        console.error("Error saving draft:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Connection error:", error);
  });
