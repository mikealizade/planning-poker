
import express from 'express';
const router = express.Router()
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
import { Request, Response } from 'express';


// router.get('/fetchjobs', async (req, res) => {
//   try {
//     const jobs = await prisma.job.findMany()
//     res.json(jobs)
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch jobs' })
//   }
// })

router.post('/createSession', async (req: Request, res: Response) => {
  const { sessionName } = req.body

  try {
    const sessions = await prisma.sessions.create({
      data: {
        // id: '',        
        host_id: 'guest',  
        session_name: sessionName, 
        // created_at: '', 
        status: 'active',    
      },
    })
    res.status(201).json(sessions)
  } catch (error) {
    console.log('🚀 ~ router.post ~ error:', error)
    res.status(400).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' })
  }
})

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
