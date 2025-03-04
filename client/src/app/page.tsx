'use client'

//reset
// app google font
// :root styles and css vars

import styled from '@emotion/styled'
import Link from 'next/link'
import { Button } from '@/styles/Styles.style'

const StartSession = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`
// const Button = styled.button`
//   display: flex;
//   justify-content: center;
//   background-color: #0f0f17;
//   border: 1px solid yellow;
//   font-size: 1.2rem;
//   border-radius: 40px;
//   padding: 10px 20px;
//   cursor: pointer;
//   color: #fff;
// `

export default function Home() {
  return (
    <StartSession>
      <Button>
        <Link href='http://localhost:3000/create'>Start a session</Link>
      </Button>
    </StartSession>
  )
}
