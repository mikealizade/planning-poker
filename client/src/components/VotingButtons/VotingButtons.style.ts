import styled from '@emotion/styled'

export const VotingButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 14px;
  padding-bottom: 20px;
  margin-top: auto;
`

export const VotingCard = styled.div`
  background-color: #18814cff;
  border-radius: 4px;
  border: 1px solid #32343d;
  width: 50px;
  height: 75px;
  color: var(--text);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  cursor: pointer;
  transition: transform 0.15s ease-in-out;

  &:hover {
    transform: scale(1.15);
  }
`
