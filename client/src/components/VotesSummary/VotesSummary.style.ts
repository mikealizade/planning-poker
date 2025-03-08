import styled from '@emotion/styled'

export const VotesSummaryList = styled.ul`
  display: flex;
  justify-content: center;
  column-gap: 30px;
  line-height: normal;
  height: 116px;

  /* font-size: 1.4rem; */
`

export const SummaryItem = styled.li`
  /* background-color: #53555e;
  padding: 10px;
  border-radius: 10px; */
  font-size: 6rem;
  line-height: normal;
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  align-items: center;
`

export const TotalVotes = styled.span`
  font-size: 0.9rem;
`
