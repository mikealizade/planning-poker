 
'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/styles/Button.style";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
export const apiUrl = process.env.NEXT_PUBLIC_API_URI ?? process.env.NEXT_PUBLIC_LOCALHOST


const createSession = async ({sessionName} : {sessionName: string}): Promise<void> => {
  const response = await axios.post('http://localhost:3001/api/createSession', {sessionName});
  return response.data;
};


export const Session = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [sessionName, setSessionName] = useState('')

  const mutation = useMutation({
    mutationFn: createSession,
    onSuccess: (data) => {
      console.log("🚀 ~ Home ~ data:", data)
      queryClient.invalidateQueries({ queryKey: ['items'] });
      const sessionId = data.id;
      
      router.push(`/session/${sessionId}`);
    },
  });

  const handleSubmit = () => {
    mutation.mutate({sessionName});
  };

  const onAddSessionName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSessionName(e.target.value)
  };


  return (
   <div>
          <h1>Start a session</h1>
      <div>
        <input type='text' name='name' value={sessionName} onChange={onAddSessionName} />
        <Button onClick={handleSubmit}>Start session</Button></div>
   </div>
  );
}
