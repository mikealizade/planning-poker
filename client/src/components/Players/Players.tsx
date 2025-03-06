import { Participant } from '@/hooks/useParticipant'
import * as S from '@/components/CurrentSession/CurrentSession.style'
import { Player } from '../Player/Player'

type PlayersProps = {
  data: Participant[]
  currentUserId: string
  areVotesVisible: boolean
  isOdd: boolean
}

export const Players = ({ data, areVotesVisible, currentUserId, isOdd }: PlayersProps) => {
  const remainder = isOdd ? 0 : 1
  const filteredData = data.filter((_, index) => index % 2 !== remainder)
  return (
    <S.Players>
      {filteredData?.map(({ userId, participantName, vote, avatar = '' }: Participant) => {
        const currentVote = vote ? (userId !== currentUserId ? (areVotesVisible ? vote : null) : vote) : null

        return (
          <li key={Math.random()}>
            <Player
              name={participantName}
              vote={currentVote} //temp, see its working
              hasVoted={!!currentVote}
              avatar={avatar}
              isOdd={isOdd}
            />
          </li>
        )
      })}
    </S.Players>
  )
}
