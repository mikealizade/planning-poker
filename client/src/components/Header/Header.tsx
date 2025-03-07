import Link from 'next/link'
import * as S from './Header.style'
import { useQuery } from '@tanstack/react-query'
import { fetchSession } from '@/api/api'
import { useParams } from 'next/navigation'

export const Header = () => {
  const { id: sessionId } = useParams<{ id: string }>()
  const { data: { sessionData: { voting_type } = {} } = {} } = useQuery({
    queryKey: ['fetchVotingType', sessionId],
    queryFn: () => fetchSession({ sessionId }),
    enabled: !!sessionId,
  })

  return (
    <S.Header>
      <S.Title>
        <Link href='/'>Point Poker</Link>
      </S.Title>
      <S.VotingType>
        Voting system is <S.VotingTypeName>{voting_type}</S.VotingTypeName>
      </S.VotingType>
      <S.Account></S.Account>
    </S.Header>
  )
}
