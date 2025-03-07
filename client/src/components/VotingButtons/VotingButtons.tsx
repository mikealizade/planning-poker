import styled from '@emotion/styled'
import { VotingValue, VotingSuit } from '../CurrentSession/CurrentSession.style'
import Image from 'next/image'

type VotingOptions = Record<string, string[]>

const votingOptions: VotingOptions = {
  fibonacci: ['1', '2', '3', '5', '8', '13', '21', '34', '55', '89', '?', '☕'],
  // 'modified fibonacci': ['0', '0.5', '1', '2', '3', '5', '8', '13', '20', '40', '100', '?', '☕'],
  tshirt: ['XS', 'S', 'M', 'L', 'XL'],
  'create custom deck': [''],
}

const Container = styled.div`
  display: flex;
  width: 50%;
  height: 400px;
  position: relative;
  align-self: center;
  flex-direction: column;
`

const CardsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  transform-origin: bottom left;
  position: absolute;
  top: 0;
  left: 0;
`

const VotingCardsContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: auto auto 0;
  justify-content: center;
  column-gap: 10px;
  transform-origin: bottom left;
`

const DealtCard = styled.div<{ x: number; y: number; rotation: number }>`
  position: absolute;
  transform-origin: bottom center; /* Ensures rotation is from the base */
  transform: translate(0px, -10px) rotate(-20deg);
  transform: ${({ x, y, rotation }) => `translate(${x}px, ${y}px) rotate(${rotation}deg)`};
  transition: transform 0.3s ease-in-out;
  background-color: #e4e5f5;
  border-radius: 12px;
  width: 70px;
  height: 100px;
  color: #000;
  display: flex;
  flex-direction: column;
`

const VotingCard = styled.div`
  background-color: #e4e5f5;
  border-radius: 8px;
  width: 45px;
  height: 60px;
  color: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  cursor: pointer;
`

const CardBackground = styled.div<{ x: number; y: number; rotation: number }>`
  position: absolute;
  transform-origin: bottom center; /* Ensures rotation is from the base */
  transform: translate(0px, -10px) rotate(-20deg);
  transform: ${({ x, y, rotation }) => `translate(${x}px, ${y}px) rotate(${rotation}deg)`};
  transition: transform 0.3s ease-in-out;
  background-color: transparent;
  border: 2px dashed #38334f;

  border-radius: 12px;
  width: 70px;
  height: 100px;
  color: #000;
  display: flex;

  &:before {
    content: '';
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 2px solid #38334f;
    position: absolute;
    left: 30px;
    top: 35px;
  }

  &:after {
    content: '.';
    width: 15px;
    height: 15px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #38334f;
    position: absolute;
    left: 20px;
    top: 35px;
  }
`
const fanCoords = [
  {
    x: 0,
    y: -10,
    rotation: -20,
  },
  {
    x: 80,
    y: -30,
    rotation: -8,
  },
  {
    x: 164,
    y: -38,
    rotation: 0,
  },
  {
    x: 248,
    y: -30,
    rotation: 8,
  },
  {
    x: 328,
    y: -10,
    rotation: 20,
  },
]

const CardBackgrounds = () => {
  return (
    <>
      {fanCoords.map((card, index) => {
        return <CardBackground key={index} x={card.x} y={card.y} rotation={card.rotation}></CardBackground>
      })}
    </>
  )
}

export const VotingButtons = ({ createVote, votingType = '' }: { createVote: (vote: string) => void; votingType: string }) => {
  const onVote = (vote: string) => () => {
    createVote(vote)
  }

  return (
    <>
      <Container>
        <CardsContainer>
          <CardBackgrounds />
        </CardsContainer>
        <CardsContainer>
          {votingOptions[votingType as keyof VotingOptions]?.map((vote, index) => {
            return (
              <DealtCard
                key={index}
                x={fanCoords[index]?.x}
                y={fanCoords[index]?.y}
                rotation={fanCoords[index]?.rotation}
                onClick={onVote(vote)}
              >
                <VotingValue>{vote}</VotingValue>
                <VotingSuit>
                  <Image alt='' src={`/images/icons/heart.svg`} width={30} height={30} />
                </VotingSuit>
              </DealtCard>
            )
          })}
        </CardsContainer>
      </Container>
      <VotingCardsContainer>
        {votingOptions[votingType as keyof VotingOptions]?.map(vote => {
          return (
            <VotingCard key={vote} onClick={onVote(vote)}>
              {vote}
            </VotingCard>
          )
        })}
      </VotingCardsContainer>
    </>
  )
}
