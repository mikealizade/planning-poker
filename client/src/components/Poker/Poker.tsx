import { Participant } from '@/hooks/useParticipant'
import { CardBackgrounds } from '../CardBackgrounds/CardBackgrounds'
import { DealtCards } from '../DealtCards/DealtCards'
import { VotingButtons } from '../VotingButtons/VotingButtons'
import { Container, CardsContainer } from './Poker.style'
import { useEffect, useRef } from 'react'

type PokerProps = {
  data: Participant[]
  currentUserId: string
  areVotesVisible: boolean
  createVote: (vote: string) => void
  votingType: string
}

export const Poker = ({ data, areVotesVisible, currentUserId, createVote, votingType = '' }: PokerProps) => {
  const suitsRef = useRef<string[]>([])

  const getSuitOrder = () => {
    // hwhaat is the max number of players?
    const suits = ['heart', 'club', 'spade', 'diamond', 'heart', 'club', 'spade', 'diamond', 'heart', 'club', 'spade', 'diamond']
    const randomSuits = [...suits].sort(() => Math.random() - 0.5)
    suitsRef.current = randomSuits
  }

  useEffect(() => {
    getSuitOrder()
  }, [areVotesVisible])

  return (
    <>
      <Container>
        <CardsContainer>
          <CardBackgrounds />
        </CardsContainer>
        <DealtCards data={data} currentUserId={currentUserId} areVotesVisible={areVotesVisible} suits={suitsRef.current} />
      </Container>
      <VotingButtons createVote={createVote} votingType={votingType} />
    </>
  )
}
