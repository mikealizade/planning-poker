import express from "express";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import routes from "./routes/routes.js";

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

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins (configure for security in production)
    credentials: true,
  },
});

const sessions: Map<
  string,
  { userId: string; participantName: string; avatar: string; vote: string }[]
> = new Map();

const addParticipant = (
  sessionId: string,
  userId: string,
  participantName: string,
  avatar: string
) => {
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, []);
  }

  const participants = sessions.get(sessionId)!;
  const userExists = participants.some((p) => p.userId === userId);

  if (!userExists) {
    participants.push({ userId, participantName, avatar, vote: "" });
    sessions.set(sessionId, participants);
  }

  console.log("🚀 Updated participants:", sessions.get(sessionId));
};

io.on("connection", (socket) => {
  console.log("🚀 User connected to socket:", socket.id);

  socket.on("reconnectSession", async ({ userId }) => {
    for (const [sessionId, participants] of sessions.entries()) {
      const user = participants.find((p) => p.userId === userId);
      if (user) {
        socket.join(sessionId);
        console.log(
          `🔄 User ${userId} rejoined session ${sessionId} and socket ${socket.id}`
        );
        io.to(sessionId).emit("sessionUpdated", sessions.get(sessionId));
        return;
      }
    }
  });

  socket.on(
    "joinSession",
    async ({ sessionId, userId, participantName, avatar }) => {
      // sessions.clear();
      // io.in(sessionId).disconnectSockets(); // Disconnect all clients in the session
      // return;
      socket.join(sessionId);
      addParticipant(sessionId, userId, participantName, avatar);
      io.to(sessionId).emit("sessionUpdated", sessions.get(sessionId));
    }
  );

  socket.on("leaveSession", async ({ sessionId, userId }) => {
    console.log("🚀 ~ socket.on ~ sessionId:", sessionId);
    console.log("🚀 ~ socket.on ~ socket.id:", socket.id);

    if (sessions.has(sessionId)) {
      let participants = sessions.get(sessionId)!;
      participants = participants.filter((p) => p.userId !== userId);
      sessions.set(sessionId, participants);

      console.log(
        "🚀 Updated participants after leave:",
        sessions.get(sessionId)
      );

      io.to(sessionId).emit("sessionUpdated", sessions.get(sessionId) ?? []);
      socket.leave(sessionId);
    }
  });

  socket.on("createVote", async ({ sessionId, participants }) => {
    console.log("🚀 ~ createVote outside if");
    if (sessions.has(sessionId)) {
      console.log("🚀 ~ createVote inside if");

      sessions.set(sessionId, participants);
      console.log("🚀 ~ sessionId:", sessionId);
      console.log("🚀 ~ participants:", participants);
      io.to(sessionId).emit("sessionUpdated", sessions.get(sessionId));
    }
  });

  socket.on("showVotes", async ({ sessionId }) => {
    if (sessions.has(sessionId)) {
      io.to(sessionId).emit("showVotes", {
        isVotesVisible: true,
      });
    }
  });

  socket.on("clearVotes", async ({ sessionId }) => {
    if (sessions.has(sessionId)) {
      io.to(sessionId).emit("showVotes", {
        isVotesVisible: false,
      });
    }
  });

  socket.on("disconnect", () => {
    const sessionId = sessions.get(socket.id);
    console.log("User disconnected:", socket.id, "from session:", sessionId);
    sessions.delete(socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
