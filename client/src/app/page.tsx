'use client'

//reset
// app google font
// :root styles and css vars

import styled from '@emotion/styled'
import Link from 'next/link'
// import { useRouter } from 'next/router'

const Main = styled.main`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  justify-content: center;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  background: radial-gradient(circle, #26213b, #0f0f17);
  border-radius: 28px;
  flex: 1;
  margin: 80px 10%;
  width: 80%;
  max-width: 1150px;
`

const Header = styled.header`
  padding: 15px 20px;
  border-bottom: 1px solid #202226;
`

const Title = styled.h1`
  color: #fcfeff;
  font-weight: bold;
  font-size: 1.2em;
  line-height: normal;
  position: relative;
  margin-left: 35px;
  display: flex;
  align-items: center;

  &:before {
    content: '';
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 2px solid #fcfeff;
    position: absolute;
    left: -25px;
    top: 2px;
  }

  &:after {
    content: '';
    width: 15px;
    height: 15px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: yellow;
    position: absolute;
    left: -35px;
    top: 2px;
  }
`
const StartSession = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`
const Button = styled.button`
  display: flex;
  justify-content: center;
  background-color: #0f0f17;
  border: 1px solid yellow;
  font-size: 1.2rem;
  border-radius: 40px;
  padding: 10px 20px;
  cursor: pointer;
  color: #fff;
`

export default function Home() {
  return (
    <Main>
      <Content>
        <Header>
          <Title>Point Poker</Title>
        </Header>
        <StartSession>
          <Button>
            <Link href='http://localhost:3000/create'>Start a session</Link>
          </Button>
        </StartSession>
      </Content>
    </Main>
  )
}
