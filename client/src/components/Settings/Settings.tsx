import { useParticipant } from '@/hooks/useParticipant'
import { getCurrentUserId } from '@/utils/storage'
import { useParams } from 'next/navigation'
import { useAppContext } from '@/providers/providers'
import { LeaveButton, SettingsContainer } from './Settings.style'
import * as S from '@/styles/Styles.style'
import { MdOutlinePages } from 'react-icons/md'
import { TbUser, TbUserX } from 'react-icons/tb'

type SettingsProps = { userName: string; sessionName: string }

export const Settings = ({ userName = '', sessionName = '' }: SettingsProps) => {
  const { id } = useParams<{ id: string }>()
  const { deleteParticipantMutation } = useParticipant({ sessionId: id })
  const {
    sessionData: { currentUserId = getCurrentUserId() },
  } = useAppContext()

  const onLeaveSession = () => {
    deleteParticipantMutation.mutate({ id: String(currentUserId) })
  }

  return (
    <SettingsContainer>
      <LeaveButton onClick={onLeaveSession}>
        <TbUserX />
      </LeaveButton>
      <S.CenteredDiv>
        <S.TextWithIcon>
          <TbUser />
          {userName}
        </S.TextWithIcon>
        <S.TextWithIcon>
          <MdOutlinePages />
          {sessionName}
        </S.TextWithIcon>
      </S.CenteredDiv>
    </SettingsContainer>
  )
}
