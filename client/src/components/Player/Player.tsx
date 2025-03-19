import Image from 'next/image'
import * as S from '@/components/CurrentSession/CurrentSession.style'

type PlayerProps = {
  name: string
  hasVoted: boolean
  avatar: string
  isOdd: boolean
}

export const Player = ({ name, hasVoted, avatar, isOdd }: PlayerProps) => {
  const status = hasVoted ? 'Voted' : 'Not voted'
  return (
    <S.PlayerContainer isOdd={isOdd}>
      <Image alt='' src={`/images/avatars/${avatar}.png`} width={120} height={120} />
      <S.Player>
        <S.PlayerStatus status={status}>{status}</S.PlayerStatus>
        <S.PlayerName>{name}</S.PlayerName>
      </S.Player>
    </S.PlayerContainer>
  )
}
