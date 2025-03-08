import { Participant } from '@/hooks/useParticipant'
import { VotesSummaryList, SummaryItem, TotalVotes } from './VotesSummary.style'

export const VotesSummary = ({ data }: { data: Participant[] }) => {
  console.log('🚀 ~ VotesSummary ~ data:', data)
  const votes = Object.groupBy(data, ({ vote }) => vote)
  // const [first] = data
  // const isConsensus = data.every(item => item.vote === first.vote)

  return (
    <>
      <VotesSummaryList>
        {Object.entries(votes).map(([key, value]) => {
          const totalVotes = value?.length
          return !!key ? (
            <SummaryItem key={key}>
              <TotalVotes>
                {totalVotes} vote{totalVotes! > 1 ? 's' : ''} for
              </TotalVotes>
              {key}
            </SummaryItem>
          ) : null
        })}
      </VotesSummaryList>
      {/* {isConsensus && <p>Consensus!</p>} */}
    </>
  )
}
