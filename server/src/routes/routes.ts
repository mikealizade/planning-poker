import express from "express";
const router = express.Router();
import { Prisma, PrismaClient } from "@prisma/client";
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

router.delete("/deleteSession/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("🚀 ~ router.delete ~ id:", id);

  try {
    const session = await prisma.sessions.delete({
      where: {
        id,
      },
    });
    res.status(201).json(session);
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
  const { sessionName, votingType } = req.body;

  try {
    const sessions = await prisma.sessions.create({
      data: {
        id: randomNumber(),
        session_name: sessionName,
        voting_type: votingType,
        status: "active",
        is_votes_visible: false,
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

router.patch("/updateSession", async (req: Request, res: Response) => {
  const { id, isVotesVisible } = req.body;

  try {
    const sessions = await prisma.sessions.update({
      where: {
        id,
      },
      data: {
        is_votes_visible: isVotesVisible,
      },
    });
    res.status(201).json(sessions);
  } catch (error) {
    console.log("🚀 ~ router.patch ~ error:", error);
    res.status(400).json({
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
});

const getAvatar = async (avatars: string[]) => {
  const values = await prisma.participants.findMany({
    select: { avatar: true }, // Replace 'email' with your desired column
  });
  console.log("🚀 ~ getAvatar ~ values:", values);

  const avatarValues = values.map((row) => row.avatar); // Extract the values into an array
  const [avatar] = avatarValues.map((value) =>
    avatars.find((avatar) => !avatarValues.includes(avatar))
  );
  return avatar || avatars[0];
};

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
    const avatars = [
      "frog",
      "gorilla",
      "cock",
      "rhino",
      "horse",
      "flamingo",
      "newt",
      "octopus",
    ];

    const avatar = await getAvatar(avatars); // Ensure avatar is resolved before using

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
        avatar,
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

router.patch("/createvote", async (req: Request, res: Response) => {
  const { id, session_id, vote } = req.body;

  try {
    const [_, participantsWithVotes] = await prisma.$transaction([
      prisma.participants.updateMany({
        where: {
          ...(!!vote && { id }),
          session_id,
        },
        data: {
          vote,
        },
      }),
      prisma.participants.findMany({
        where: {
          session_id,
        },
      }),
    ]);

    res.status(201).json(participantsWithVotes);
  } catch (error) {
    console.error("🚀 ~ router.patch ~ error:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).json({
        error: `Prisma error: ${error.message}`,
      });
    } else {
      res.status(500).json({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  }
});

router.delete("/deleteParticipant/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("🚀 ~ router.delete ~ id:", id);

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

export default router;
