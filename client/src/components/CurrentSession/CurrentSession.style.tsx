import styled from '@emotion/styled'

export const Content = styled.div`
  display: flex;
  width: 100%;
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

export const LeaveButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #52545e;
  color: #d4d4d4;
  border: 0;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 2px 8px;
`
