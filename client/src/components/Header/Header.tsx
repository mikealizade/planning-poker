import Link from 'next/link'
import * as S from './Header.style'
import { useQuery } from '@tanstack/react-query'
import { fetchSession } from '@/api/api'
import { useParams } from 'next/navigation'
import { getCurrentUserId } from '@/utils/storage'
import { CenteredDiv, TextWithIcon } from '@/styles/Styles.style'
import { TbUser } from 'react-icons/tb'
import { MdOutlinePages } from 'react-icons/md'
import { useAppContext } from '@/providers/providers'

export const Header = () => {
  const { id: sessionId } = useParams<{ id: string }>()
  const { data: { sessionData: { session_name, voting_type } = {} } = {} } = useQuery({
    queryKey: ['fetchVotingType', sessionId],
    queryFn: () => fetchSession({ sessionId }),
    enabled: !!sessionId,
  })
  const storedUserId = getCurrentUserId()
  const {
    sessionData: { participants = [] },
  } = useAppContext()
  const userName = participants?.find(({ userId }: { userId?: string }) => userId === storedUserId)?.participantName

  return (
    <S.Header>
      <S.Title>
        <Link href='/'>Point Poker</Link>
      </S.Title>
      <S.SessionName>
        <CenteredDiv>
          {userName && (
            <TextWithIcon>
              <TbUser />
              {userName}
            </TextWithIcon>
          )}
          {session_name && (
            <TextWithIcon>
              <MdOutlinePages />
              {session_name}
            </TextWithIcon>
          )}
        </CenteredDiv>
      </S.SessionName>
      {voting_type && (
        <S.VotingType>
          Voting system is <S.VotingTypeName>{voting_type}</S.VotingTypeName>
        </S.VotingType>
      )}
      {/* <S.Account></S.Account> */}
    </S.Header>
  )
}
