import { Participant } from '@/hooks/useParticipant'
import Image from 'next/image'
import * as S from './DealtCards.style'
import { VscCoffee } from 'react-icons/vsc'

type DealtCardsProps = {
  data: Participant[]
  currentUserId: string
  areVotesVisible: boolean
  suits: string[]
}

export const fanCoords = [
  {
    x: -35,
    y: -10,
    rotation: -20,
  },
  {
    x: 45,
    y: -30,
    rotation: -8,
  },
  {
    x: 129,
    y: -38,
    rotation: 0,
  },
  {
    x: 213,
    y: -30,
    rotation: 8,
  },
  {
    x: 293,
    y: -10,
    rotation: 20,
  },
]

export const DealtCards = ({ data, areVotesVisible, currentUserId, suits }: DealtCardsProps) => {
  // console.log('🚀 ~ suits:', suits)
  return (
    <S.CardsContainer>
      {data?.map(({ userId, vote }, index) => {
        if (!vote) return null
        const currentVote = userId !== currentUserId ? (areVotesVisible ? vote : null) : vote
        const colour = suits[index] == 'heart' || suits[index] === 'diamond' ? 'red' : 'black'
        const suit = `/images/icons/${suits[index]}.svg`

        // console.log('🚀 ~ {data?.map ~ suit:', suit, index)
        return (
          <S.DealtCard key={index} x={fanCoords[index]?.x} y={fanCoords[index]?.y} rotation={fanCoords[index]?.rotation}>
            {currentVote !== null ? (
              <>
                <S.VotingValue colour={colour}>
                  {vote === 'T' ? <VscCoffee /> : vote}
                  <Image alt='' src={suit} width={10} height={10} />
                </S.VotingValue>
                <S.VotingSuit>
                  <Image alt='' src={suit} width={30} height={30} />
                </S.VotingSuit>
              </>
            ) : (
              <S.FlippedCard />
            )}
          </S.DealtCard>
        )
      })}
    </S.CardsContainer>
  )
}
