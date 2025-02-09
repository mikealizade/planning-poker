import express from "express";
const router = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Request, Response } from "express";
import { customAlphabet } from "nanoid";

router.get("/fetchSession/:sessionId", async (req, res) => {
  const { sessionId } = req.params;
  try {
    const sessionData = await prisma.sessions.findUnique({
      where: {
        id: sessionId,
      },
    });
    const participants = await prisma.participants.findMany({
      where: {
        session_id: sessionId,
      },
    });
    res.json({ sessionData, participants });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch sessionData" });
  }
});

router.delete("/leaveSession", async (req: Request, res: Response) => {
  const { id } = req.body;
  console.log("🚀 ~ router.post ~ leave:", id);

  try {
    const participants = await prisma.participants.delete({
      where: {
        id,
      },
    });
    res.status(201).json(participants);
  } catch (error) {
    console.log("🚀 ~ router.post ~ error:", error);
    res.status(400).json({
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
});

router.post("/createSession", async (req: Request, res: Response) => {
  const randomNumber = customAlphabet("1234567890", 6);
  const { sessionName, host_id } = req.body;

  try {
    const sessions = await prisma.sessions.create({
      data: {
        id: randomNumber(),
        host_id: host_id ?? "guest",
        session_name: sessionName,
        status: "active",
      },
    });
    res.status(201).json(sessions);
  } catch (error) {
    console.log("🚀 ~ router.post ~ error:", error);
    res.status(400).json({
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
});

router.post("/createParticipant", async (req: Request, res: Response) => {
  const {
    id,
    session_id,
    is_host,
    participant_name,
    vote,
    has_voted,
    is_active,
    role,
  } = req.body;

  try {
    const participant = await prisma.participants.create({
      data: {
        id: id ?? "guest",
        session_id,
        is_host,
        participant_name,
        vote,
        has_voted,
        is_active,
        role,
      },
    });
    res.status(201).json(participant);
  } catch (error) {
    console.log("🚀 ~ router.post ~ error:", error);
    res.status(400).json({
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
});

// router.delete('/deletejob', async (req, res) => {
//   const { id } = req.body
//   console.log('🚀 ~ router.post ~ id:', id)

//   try {
//     const todo = await prisma.job.delete({
//       where: {
//         id,
//       },
//     })
//     res.status(201).json(todo)
//   } catch (error) {
//     res.status(400).json({ error: error.message })
//   }
// })

export default router;
