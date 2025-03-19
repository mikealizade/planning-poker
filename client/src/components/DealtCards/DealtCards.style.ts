import styled from '@emotion/styled'

export const CardsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  transform-origin: bottom left;
  position: absolute;
  top: 60px;
  left: 0;
`

export const DealtCard = styled.div<{ x: number; y: number; rotation: number }>`
  position: absolute;
  transform-origin: bottom center;
  transform: translate(0px, -10px) rotate(-20deg);
  transform: ${({ x, y, rotation }) => `translate(${x}px, ${y}px) rotate(${rotation}deg)`};
  transition: transform 0.3s ease-in-out;
  background-color: #e4e5f5;
  border-radius: 12px;
  width: 70px;
  height: 100px;
  color: #000;
  display: flex;
  flex-direction: column;
`

export const FlippedCard = styled.div`
  &:before {
    content: '';
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 2px solid #38334f;
    position: absolute;
    left: 32px;
    top: 42px;
  }

  &:after {
    content: '.';
    width: 15px;
    height: 15px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #38334f;
    position: absolute;
    left: 22px;
    top: 42px;
  }
`

export const VotingValue = styled.div<{ colour: string }>`
  color: ${({ colour }) => colour};
  display: flex;
  justify-content: flex-start;
  font-size: 2rem;
  flex: 1;
  padding: 10px 0 0 10px;
  align-items: flex-start;
  column-gap: 5px;
  line-height: 22px;
`
export const VotingSuit = styled.div`
  color: #000;
  display: flex;
  justify-content: flex-end;
  align-items: end;
  flex: 1;
  padding: 0 10px 10px 0;
`
