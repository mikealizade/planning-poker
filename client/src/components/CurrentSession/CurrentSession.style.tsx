import { ButtonText } from '@/styles/Styles.style'
import styled from '@emotion/styled'

export const Content = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
`
export const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`
export const LeftColumn = styled(Column)`
  flex: 1;
`

export const MiddleColumn = styled(Column)`
  flex: 3;
  row-gap: 40px;
`

export const RightColumn = styled(Column)`
  flex: 1;
`

export const Players = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
`

export const PlayerContainer = styled.div<{ isOdd: boolean }>`
  display: flex;
  flex-direction: ${({ isOdd }) => (isOdd ? 'row-reverse' : 'row')};
  row-gap: 12px;
  align-items: center;
  column-gap: 12px;
  position: relative;
`

export const Player = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  align-items: center;
  justify-content: flex-start;
`

export const PlayerStatus = styled.div`
  background-color: #000;
  border-radius: 30px;
  color: #716ded;
  padding: 5px 12px;
  display: inline-flex;
  align-self: center;
  font-size: 1.15rem;
  min-width: 90px;
  justify-content: center;
`

export const PlayerName = styled.div`
  font-size: 1.6rem;
`

// export const SessionName = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-size: 2rem;
//   line-height: normal;
// `

export const ShowButton = styled(ButtonText)`
  color: #43d18a;
`

export const ClearButton = styled(ButtonText)`
  color: #e83c56;
`

export const LeaveButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  color: #fff;
  border: 0;
  /* border-radius: 20px; */
  cursor: pointer;
  font-size: 0.9rem;
  padding: 2px 8px;
`
export const VotingCards = styled.div`
  display: flex;
  position: relative;
  width: 100%; /* Adjust width to control arc size */
  height: 150px; /* Half of width to form a semi-circle */
  justify-content: center;
`
export const VotingCard = styled.div<{ x: number; y: number }>`
  background-color: #fff;
  border-radius: 12px;
  width: 70px;
  height: 100px;
  color: #000;
  display: flex;
  flex-direction: column;
  transform: ${({ x, y }) => `translate(${x}px, ${y}px)`};

  /* &:nth-of-type(1) {
    transform: translate(0px, 10px);
    rotate: -12deg;
  }
  &:nth-of-type(2) {
    transform: translate(0px, -10px);
    rotate: -10deg;
  } */
`
export const VotingValue = styled.div`
  color: #000;
  display: flex;
  justify-content: flex-start;
  font-size: 1.4rem;
  flex: 1;
  padding: 5px 0 0 5px;
`
export const VotingSuit = styled.div`
  color: #000;
  display: flex;
  justify-content: flex-end;
  align-items: end;
  flex: 1;
  padding: 0 10px 10px 0;
`

export const Card = styled.div`
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #d6d3d3;
  color: white;
  font-size: 1.1rem;
  border-radius: 6px;
  width: 40px;
  height: 60px;
`
