'use client'

import styled from '@emotion/styled'
import Link from 'next/link'
import { Button } from '@/styles/Styles.style'

const StartSession = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`

export default function Home() {
  return (
    <StartSession>
      <Button>
        <Link href='http://localhost:3000/create'>Start a session</Link>
      </Button>
    </StartSession>
  )
}
