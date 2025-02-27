type VotingOptions = Record<string, string[]>

const votingOptions: VotingOptions = {
  fibonacci: ['1', '2', '3', '5', '8', '13', '21', '34', '55', '89', '?', '☕'],
  'modified fibonacci': ['0', '0.5', '1', '2', '3', '5', '8', '13', '20', '40', '100', '?', '☕'],
  tshirt: ['XS', 'S', 'M', 'L', 'XL', '☕'],
  'create custom deck': [''],
}

export const VotingButtons = ({ setVotingType }: { setVotingType: (vote: string) => void }) => {
  const onSelectVotingType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.target.value
    if (target === 'create custom deck') return
    setVotingType(target)
  }

  return (
    <select onChange={onSelectVotingType}>
      <option value=''>Select</option>
      {Object.keys(votingOptions).map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}
