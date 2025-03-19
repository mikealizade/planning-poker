import styled from '@emotion/styled'

export const VotingButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: auto auto 0;
  justify-content: center;
  column-gap: 10px;
  transform-origin: bottom left;
`

export const VotingCard = styled.div`
  background-color: #1d1d2e;
  border-radius: 50%;
  border: 3px solid #32343d;
  width: 45px;
  height: 45px;
  color: #716ded;
  /* font-weight: bold; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    border-color: #444;
  }
`
