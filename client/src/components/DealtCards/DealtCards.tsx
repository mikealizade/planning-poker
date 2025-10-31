import { Participant } from '@/hooks/useParticipant'
import * as S from './DealtCards.style'
import { VscCoffee } from 'react-icons/vsc'

type DealtCardsProps = {
  data: Participant[]
  currentUserId: string
  areVotesVisible: boolean
}

export const DealtCards = ({ data, areVotesVisible, currentUserId }: DealtCardsProps) => {
  return (
    <S.CardsContainer>
      {data?.map(({ userId, vote }, index) => {
        if (!vote) return null
        const currentVote = userId !== currentUserId ? (areVotesVisible ? vote : null) : vote

        return (
          <S.DealtCard key={index}>{currentVote !== null ? <>{vote === 'T' ? <VscCoffee /> : vote}</> : <S.FlippedCard />}</S.DealtCard>
        )
      })}
    </S.CardsContainer>
  )
}
