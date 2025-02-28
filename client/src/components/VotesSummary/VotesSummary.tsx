import { Participant } from '@/hooks/useParticipant'

export const VotesSummary = ({ data }: { data: Participant[] }) => {
  console.log('🚀 ~ VotesSummary ~ data:', data)
  const votes = Object.groupBy(data, ({ vote }) => vote)
  const [first] = data
  const isConsensus = data.every(item => item.vote === first.vote)

  return (
    <>
      <ul>
        {Object.entries(votes).map(([key, value]) => {
          return !!key ? (
            <li key={key}>
              {key} <strong>{value!.length}</strong>
            </li>
          ) : null
        })}
      </ul>
      {isConsensus && <p>Consensus!</p>}
    </>
  )
}
