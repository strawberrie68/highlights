const router = require("express").Router();
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
let Book = require("../models/bookModel");
let Quote = require("../models/quoteModel");
const { User } = require("../models/User");

// GET user's books
router.route("/").get(auth, (req, res) => {
  Book.find({ user: req.userId })
    .populate("quote")
    .then((books) => res.json(books))
    .catch((err) => res.status(400).json("Error: " + err));
});

// FIND specific book (verify ownership)
router.route("/:id").get(auth, async (req, res) => {
  try {
    const book = await Book.findOne({
      _id: req.params.id,
      user: req.userId,
    }).populate("quote");
    if (!book) {
      return res.status(404).json({ nobookfound: "No Book found" });
    }
    res.json(book);
  } catch (err) {
    res.status(404).json({ nobookfound: "No Book found" });
  }
});

// ADD BOOK
router.route("/add").post(auth, (req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  const description = req.body.description;
  const bookImg = req.body.bookImg;
  const tag = req.body.tag;
  const fav = req.body.fav;
  const genre = req.body.genre;
  const isFinishedReading = req.body.isFinishedReading;
  const user = req.userId;

  const newBook = new Book({
    title,
    author,
    description,
    bookImg,
    tag,
    fav,
    isFinishedReading,
    genre,
    user,
  });

  newBook
    .save()
    .then(() => res.json("Book added"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Add quote to book
router.route("/:id").post(auth, async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id, user: req.userId });
    if (!book) {
      return res
        .status(404)
        .json({ message: "Book not found or unauthorized" });
    }

    const quote = await Quote.create(req.body);
    await Book.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { quote: quote._id } },
      { upsert: true }
    );
    res.json({ message: "Quote added successfully" });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete book
router.route("/:id").delete(auth, async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });
    if (!book) {
      return res
        .status(404)
        .json({ message: "Book not found or unauthorized" });
    }
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

// Update book
router.put("/update/:id", auth, async (req, res) => {
  try {
    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!book) {
      return res
        .status(404)
        .json({ message: "Book not found or unauthorized" });
    }
    res.json({ message: "Updated successfully" });
  } catch (err) {
    res.status(400).json({ error: "Unable to update the Database" });
  }
});

// Test user routes
const TEST_USER = {
  email: "test@example.com",
  username: "testuser",
  password: "Test123!@#",
};

// Sample books data
const SAMPLE_BOOKS = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    description: "An Easy & Proven Way to Build Good Habits & Break Bad Ones",
    bookImg:
      "https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg",
    genre: "Self-Help",
    fav: true,
    isFinishedReading: true,
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    description: "Rules for Focused Success in a Distracted World",
    bookImg:
      "https://m.media-amazon.com/images/I/51vmivI5KvL._SX318_BO1,204,203,200_.jpg",
    genre: "Productivity",
    fav: false,
    isFinishedReading: false,
  },
  {
    title: "Steal Like An Artist",
    author: "Austin Kleon",
    description:
      "Steal Like an Artist by Austin Kleon is a concise and inspiring manifesto that encourages creative individuals to embrace influences, embrace their own uniqueness, and make art by remixing and reimagining existing ideas.",
    bookImg:
      "https://m.media-amazon.com/images/I/41D0JD53t9L._SY495_BO1,204,203,200_.jpg",
    genre: "Productivity",
    fav: false,
    isFinishedReading: false,
  },
  {
    title: "How to Take Smart Notes",
    author: "Sönke Ahrens",
    description: "Transformed my relationship with note-taking.",
    bookImg:
      "https://aliabdaal.com/wp-content/uploads/2023/01/How-to-Take-Smart-Notes.jpg",
    genre: "Productivity",
    fav: false,
    isFinishedReading: false,
  },
];

router.post("/test-user/login", async (req, res) => {
  try {
    const testUser = await User.findOneAndUpdate(
      { email: TEST_USER.email },
      {
        $setOnInsert: {
          username: TEST_USER.username,
          password: await bcrypt.hash(
            TEST_USER.password,
            await bcrypt.genSalt(10)
          ),
        },
      },
      {
        upsert: true,
        new: true,
      }
    );

    await Book.deleteMany({ user: testUser._id });

    const booksWithUserId = SAMPLE_BOOKS.map((book) => ({
      ...book,
      user: testUser._id,
    }));

    await Promise.all(booksWithUserId.map((book) => Book.create(book)));

    const token = testUser.generateAuthToken();

    res.json({
      message: "Test user logged in and data reset",
      token,
      userId: testUser._id,
    });
  } catch (err) {
    console.error("Test user login error:", err);
    res.status(500).json({
      error: "Failed to login test user",
      details: err.message,
    });
  }
});

router.post("/test-user/cleanup", async (req, res) => {
  try {
    const testUser = await User.findOne({ email: TEST_USER.email });
    if (testUser) {
      await Book.deleteMany({ user: testUser._id });
      await Quote.deleteMany({ user: testUser._id });
      res.json({ message: "Test user data cleaned up successfully" });
    } else {
      res.status(404).json({ message: "Test user not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to clean up test user data" });
  }
});

module.exports = router;
