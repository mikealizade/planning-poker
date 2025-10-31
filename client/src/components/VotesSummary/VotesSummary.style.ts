import styled from '@emotion/styled'

export const VotesSummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  height: 71px;
`

export const VotesSummaryList = styled.ul`
  display: flex;
  justify-content: center;
  font-size: 1.3rem;
  column-gap: 20px;
`

export const SummaryItem = styled.li`
  line-height: normal;
  display: flex;
  align-items: center;
`

export const VoteValue = styled.span`
  font-weight: bold;
`

export const Consensus = styled.div`
  display: inline-flex;
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
  justify-content: center;

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
