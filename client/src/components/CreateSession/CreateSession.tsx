'use client'
import { Button } from '@/styles/Button.style'
import { useState } from 'react'
// import { useAppContext } from '@/providers/providers'
import { useSession } from '@/hooks/useSession'
export const apiUrl = process.env.NEXT_PUBLIC_API_URI

export const CreateSession = () => {
  const [sessionName, setSessionName] = useState('')
  // const [hostName, setHostName] = useState('')
  // const { sessionData } = useAppContext()
  const { createSessionMutation } = useSession()
  // console.log('🚀 ~ CreateSession ~ sessionData:', sessionData)

  const onCreateSession = () => {
    createSessionMutation.mutate({ sessionName })
  }

  // const onAddHostName = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setHostName(e.target.value)
  // }

  const onAddSessionName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSessionName(e.target.value)
  }

  return (
    <div>
      <h1>Start a session</h1>
      {/* <div>
        <input type='text' name='hostname' value={hostName} placeholder='Your name' onChange={onAddHostName} />
      </div> */}
      <div>
        <input type='text' name='name' value={sessionName} onChange={onAddSessionName} />
        <Button onClick={onCreateSession}>Start session</Button>
      </div>
      {/* <div>
        <h1>Join a session</h1>

        <input type='text' name='name' value={sessionName} onChange={onJoinSessionName} />
        <Button onClick={onJoinSession}>Start session</Button>
      </div> */}
    </div>
  )
}
