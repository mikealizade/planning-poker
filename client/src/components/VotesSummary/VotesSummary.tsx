import { Participant } from '@/hooks/useParticipant'
import { VotesSummaryList, SummaryItem, VoteValue, Consensus, VotesSummaryContainer } from './VotesSummary.style'
import { VscCoffee } from 'react-icons/vsc'

type VoteSummaryProps = { data: Participant[]; areVotesVisible: boolean }

export const VotesSummary = ({ data, areVotesVisible }: VoteSummaryProps) => {
  const votes = Object.groupBy(data, ({ vote }) => vote)
  const hasVotes = data.some(({ vote }) => vote)
  const [first] = data
  const isConsensus = data.every(item => item.vote === first.vote)

  return (
    <VotesSummaryContainer>
      {areVotesVisible && (
        <VotesSummaryList>
          {hasVotes &&
            Object.entries(votes).map(([key, value]) => {
              const totalVotes = value?.length
              return !!key ? (
                <SummaryItem key={key}>
                  <div>
                    {totalVotes} vote{totalVotes! > 1 ? 's' : ''}
                  </div>
                  <VoteValue>: {key === 'T' ? <VscCoffee /> : key}</VoteValue>
                </SummaryItem>
              ) : null
            })}
        </VotesSummaryList>
      )}
      {isConsensus && hasVotes && areVotesVisible && <Consensus>Consensus!</Consensus>}
    </VotesSummaryContainer>
  )
}
