import styled from '@emotion/styled'

export const VotesSummaryContainer = styled.div`
  display: block;
  position: relative;
`

export const VotesSummaryList = styled.ul`
  display: flex;
  justify-content: center;
  column-gap: 30px;
  line-height: normal;
  height: 116px;
  margin-top: -44px;
`

export const SummaryItem = styled.li`
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

export const VoteValue = styled.span`
  line-height: 85px;
  font-weight: 600;
`

export const Consensus = styled.div`
  display: flex;
  align-self: center;
  background-color: #43d18a;
  color: #000;
  padding: 5px 15px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 35px;
  cursor: pointer;
  outline: none;
  transition: all 0.3s ease-in-out;
  animation: elasticPing 1s cubic-bezier(0.25, 1.5, 0.5, 1) both;
  position: absolute;
  top: 72px;
  left: calc(50% - 61px);

  @keyframes elasticPing {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    50% {
      transform: scale(1.4);
      opacity: 1;
    }
    70% {
      transform: scale(0.85);
    }
    85% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
`
