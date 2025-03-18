import { Participant } from '@/hooks/useParticipant'
import * as S from '@/components/CurrentSession/CurrentSession.style'
import { Player } from '../Player/Player'

type PlayersProps = {
  data: Participant[]
  isOdd: boolean
}

export const Players = ({ data, isOdd }: PlayersProps) => {
  const remainder = isOdd ? 0 : 1
  const filteredData = data.filter((_, index) => index % 2 !== remainder)
  return (
    <S.Players>
      {filteredData?.map(({ participantName, vote, avatar = '' }: Participant) => {
        return (
          <li key={Math.random()}>
            <Player name={participantName} hasVoted={!!vote} avatar={avatar} isOdd={isOdd} />
          </li>
        )
      })}
    </S.Players>
  )
}
