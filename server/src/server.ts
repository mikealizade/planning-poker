import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/routes.js"; // Import the routes file


// Enable CORS for all routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())
app.use('/api', routes)

app.get("/", (req, res) => {
  res.send("Hello, Planning Poker!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
