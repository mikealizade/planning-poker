import { VotingButtonsContainer, VotingCard } from './VotingButtons.style'
import { VscCoffee } from 'react-icons/vsc'

type VotingOptions = Record<string, string[]>

const votingOptions: VotingOptions = {
  fibonacci: ['1', '2', '3', '5', '8', '13', '21', '34', '55', '89', '?', 'T'],
  // 'modified fibonacci': ['0', '0.5', '1', '2', '3', '5', '8', '13', '20', '40', '100', '?', '☕'],
  tshirt: ['XS', 'S', 'M', 'L', 'XL'],
  'create custom deck': [''],
}

export const VotingButtons = ({ createVote, votingType = '' }: { createVote: (vote: string) => void; votingType: string }) => {
  const onVote = (vote: string) => () => {
    createVote(vote)
  }

  return (
    <VotingButtonsContainer>
      {votingOptions[votingType as keyof VotingOptions]?.map(vote => {
        return (
          <VotingCard key={vote} onClick={onVote(vote)}>
            {vote === 'T' ? <VscCoffee /> : vote}
          </VotingCard>
        )
      })}
    </VotingButtonsContainer>
  )
}
