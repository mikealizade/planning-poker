type VotingOptions = Record<string, string[]>

const votingOptions: VotingOptions = {
  fibonacci: ['1', '2', '3', '5', '8', '13', '21', '34', '55', '89', '?', '☕'],
  'modified fibonacci': ['0', '0.5', '1', '2', '3', '5', '8', '13', '20', '40', '100', '?', '☕'],
  tshirt: ['XS', 'S', 'M', 'L', 'XL', '12'],
  'create custom deck': [''],
}

export const VotingButtons = ({ createVote, votingType = '' }: { createVote: (vote: string) => void; votingType: string }) => {
  const onVote = (vote: string) => () => {
    createVote(vote)
  }

  return (
    <ul>
      {votingOptions[votingType as keyof VotingOptions]?.map((vote: string) => (
        <li key={vote}>
          <button onClick={onVote(vote)}>{vote}</button>
        </li>
      ))}
    </ul>
  )
}
