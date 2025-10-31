import { ButtonText } from '@/styles/Styles.style'
import styled from '@emotion/styled'

export const Content = styled.div`
  display: flex;
  width: 100%;
  flex: 1;

  flex-direction: column;
  row-gap: 50px;
`

export const Players = styled.ul`
  display: flex;
  flex-direction: row;
  row-gap: 30px;
  justify-content: center;
`

export const PlayerContainer = styled.div<{ isOdd: boolean }>`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  align-items: center;
  column-gap: 12px;
  position: relative;
`

export const Player = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`

export const PlayerStatus = styled.div<{ status: string }>`
  border-radius: 30px;
  color: ${({ status }) => (status === 'Voted' ? '#43d18a' : '#e83c56')};
  padding: 5px 12px;
  display: inline-flex;
  align-self: center;
  font-size: 1.15rem;
  min-width: 102px;
  justify-content: center;
  text-align: center;
  width: 90px;
`

export const PlayerName = styled.div`
  font-size: 1.6rem;
`

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
  cursor: pointer;
  font-size: 0.9rem;
  padding: 2px 8px;
`
export const VotingCards = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 150px;
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
