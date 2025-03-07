import Image from 'next/image'
import * as S from '@/components/CurrentSession/CurrentSession.style'

type PlayerProps = {
  name: string
  hasVoted: boolean
  avatar: string
  isOdd: boolean
}

export const Player = ({ name, hasVoted, avatar, isOdd }: PlayerProps) => {
  return (
    <S.PlayerContainer isOdd={isOdd}>
      <Image alt='' src={`/images/avatars/${avatar}.png`} width={120} height={120} />
      <S.Player>
        <S.PlayerStatus>{hasVoted ? 'Voted' : 'Not voted'}</S.PlayerStatus>
        <S.PlayerName>{name}</S.PlayerName>
      </S.Player>
    </S.PlayerContainer>
  )
}
