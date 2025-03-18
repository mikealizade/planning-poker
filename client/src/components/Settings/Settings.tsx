import { useParticipant } from '@/hooks/useParticipant'
import { getCurrentUserId } from '@/utils/storage'
import { useParams } from 'next/navigation'
import { useAppContext } from '@/providers/providers'
import { LeaveButton, SettingsContainer } from './Settings.style'
import { TbUserX } from 'react-icons/tb'
import { IoSettingsOutline } from 'react-icons/io5'

export const Settings = () => {
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
      <IoSettingsOutline />
      <LeaveButton onClick={onLeaveSession}>
        <TbUserX />
      </LeaveButton>
    </SettingsContainer>
  )
}
