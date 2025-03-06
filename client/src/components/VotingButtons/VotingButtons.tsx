import styled from '@emotion/styled'
import { VotingValue, VotingSuit } from '../CurrentSession/CurrentSession.style'
import Image from 'next/image'

type VotingOptions = Record<string, string[]>

const votingOptions: VotingOptions = {
  fibonacci: ['1', '2', '3', '5', '8', '13', '21', '34', '55', '89', '?', '☕'],
  'modified fibonacci': ['0', '0.5', '1', '2', '3', '5', '8', '13', '20', '40', '100', '?', '☕'],
  tshirt: ['XS', 'S', 'M', 'L', 'XL', '12'],
  'create custom deck': [''],
}

const VotingCardsContainer = styled.div`
  position: relative;
  /* width: 380px; */
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  perspective: 800px;
  margin: auto auto -35px;
`

const Card = styled.div<{ x: number; y: number; rotation: number }>`
  position: absolute;
  transform-origin: bottom center; /* Ensures rotation is from the base */
  transform: ${({ x, y, rotation }) => `translate(${x}px, ${y}px) rotate(${rotation}deg)`};
  transition: transform 0.3s ease-in-out;
  background-color: #e4e5f5;
  border-radius: 12px;
  width: 60px;
  height: 90px;
  color: #000;
  display: flex;
  flex-direction: column;
`

export const VotingButtons = ({ createVote, votingType = '' }: { createVote: (vote: string) => void; votingType: string }) => {
  const totalCards = votingOptions[votingType as keyof VotingOptions].length
  const half = Math.ceil(totalCards / 2)
  const arcRadius = 190 // Further reduced for a shallower arc
  const maxRotation = 25 // Reduced to lessen the rotation at the edges
  const rowOffset = 60 // Keeps rows well-separated
  const cardSpacing = 180 // Less space between edge cards

  const cardWidth = 90 * 0.684 // Adjust width to maintain aspect ratio (90px height)
  const cardHeight = 90 // New height

  const onVote = (vote: string) => () => {
    createVote(vote)
  }

  return (
    <VotingCardsContainer>
      {votingOptions[votingType as keyof VotingOptions]?.map((vote, index) => {
        const isTopRow = index < half
        const rowIndex = isTopRow ? index : index - half
        const centerIndex = (half - 1) / 2
        const angleOffset = (rowIndex - centerIndex) / centerIndex
        const rotation = maxRotation * angleOffset // Reduced rotation for less edge rotation
        const x = angleOffset * cardSpacing
        // Shallow arc by reducing multiplier for y position
        const y = Math.pow(angleOffset, 2) * 40 - arcRadius + (isTopRow ? -rowOffset : rowOffset) // Reduced multiplier for a shallower arc

        return (
          <Card
            key={index}
            x={x}
            y={y}
            rotation={rotation}
            style={{ width: `${cardWidth}px`, height: `${cardHeight}px` }}
            onClick={onVote(vote)}
          >
            <VotingValue>{vote}</VotingValue>
            <VotingSuit>
              <Image alt='' src={`/images/icons/heart.svg`} width={30} height={30} />
            </VotingSuit>
          </Card>
        )
      })}
    </VotingCardsContainer>
  )
}
