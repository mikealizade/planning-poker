import express from "express";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import routes from "./routes/routes.js"; // Import the routes file

// Enable CORS for all routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// const prisma = new PrismaClient()

app.use(cors());
app.use(express.json());
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Hello, Planning Poker!");
});

const server = createServer(app); // Create an HTTP server

const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins (configure for security in production)
    credentials: true,
  },
});

const sessions: Map<string, { userId: string; participantName: string }[]> =
  new Map();

const addParticipant = (
  sessionId: string,
  userId: string,
  participantName: string
) => {
  console.log("🚀 Adding participant:", { sessionId, userId, participantName });

  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, []);
  }

  const participants = sessions.get(sessionId)!;
  const userExists = participants.some((p) => p.userId === userId);

  if (!userExists) {
    participants.push({ userId, participantName });
    sessions.set(sessionId, participants); // Ensure Map is updated
  }

  console.log("🚀 Updated participants:", sessions.get(sessionId));
};

io.on("connection", (socket) => {
  console.log("🚀 User connected:", socket.id);

  // console.log(sessions.size);
  // return;

  socket.on("joinSession", async ({ sessionId, userId, participantName }) => {
    // sessions.clear();
    // io.in(sessionId).disconnectSockets(); // Disconnect all clients in the session
    // return;
    socket.join(sessionId);
    addParticipant(sessionId, userId, participantName);
    io.to(sessionId).emit("sessionUpdated", sessions.get(sessionId));
  });

  socket.on("leaveSession", async ({ sessionId, userId }) => {
    console.log("🚀 User leaving session:", { sessionId, userId });
    console.log("🚀 ~ socket.on ~ sessions:", sessions);
    console.log("🚀 ~ socket.on ~ sessionId:", sessionId);
    if (sessions.has(sessionId)) {
      let participants = sessions.get(sessionId)!;
      participants = participants.filter((p) => p.userId !== userId); // Correctly remove user
      console.log("🚀 ~ socket.on ~ participants:", participants);
      sessions.set(sessionId, participants);

      console.log(
        "🚀 Updated participants after leave:",
        sessions.get(sessionId)
      );

      io.to(sessionId).emit("sessionUpdated", sessions.get(sessionId) ?? []);
      // socket.leave(sessionId);
    }
  });

  socket.on("createVote", async ({ sessionId, participants }) => {
    if (sessions.has(sessionId)) {
      console.log("🚀 ~ socket.on ~ sessionId:", sessionId);
      console.log(
        "🚀 ~ socket.on ~ sessions.has(sessionId):",
        sessions.has(sessionId)
      );
      sessions.set(sessionId, participants);
      io.to(sessionId).emit("sessionUpdated", sessions.get(sessionId));
    }
  });

  socket.on("showVotes", async ({ sessionId }) => {
    if (sessions.has(sessionId)) {
      io.to(sessionId).emit("showVotes", {
        isVotesVisible: true,
        isVotesCleared: false,
      });
    }
  });

  socket.on("clearVotes", async ({ sessionId }) => {
    if (sessions.has(sessionId)) {
      // io.to(sessionId).emit("clearVotes", true);
      io.to(sessionId).emit("showVotes", {
        isVotesVisible: false,
        isVotesCleared: true,
      });
    }
  });

  // socket.on("disconnect", () => {
  //   const sessionId = socket.data.sessionId; // Retrieve stored sessionId
  //   console.log("User disconnected:", socket.id, "from session:", sessionId);

  // if (sessionId) {
  //   io.in(sessionId).disconnectSockets(); // Disconnect all clients in the session
  // }
  // });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
