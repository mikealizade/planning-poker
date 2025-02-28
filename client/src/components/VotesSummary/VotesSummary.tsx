import { Participant } from '@/hooks/useParticipant'

export const VotesSummary = ({ data }: { data: Participant[] }) => {
  const votes = Object.groupBy(data, ({ vote }) => vote)

  return (
    <ul>
      {Object.entries(votes).map(([key, value]) => (
        <li key={key}>
          {key} <strong>{value!.length}</strong>
        </li>
      ))}
    </ul>
  )
}
