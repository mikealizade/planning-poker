import styled from '@emotion/styled'

export const CardBackground = styled.div<{ x: number; y: number; rotation: number }>`
  position: absolute;
  transform-origin: bottom center; /* Ensures rotation is from the base */
  transform: translate(0px, -10px) rotate(-20deg);
  transform: ${({ x, y, rotation }) => `translate(${x}px, ${y}px) rotate(${rotation}deg)`};
  transition: transform 0.3s ease-in-out;
  background-color: transparent;
  border: 2px dashed #38334f;

  border-radius: 12px;
  width: 70px;
  height: 100px;
  color: #000;
  display: flex;

  &:before {
    content: '';
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 2px solid #38334f;
    position: absolute;
    left: 30px;
    top: 38px;
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
    left: 20px;
    top: 38px;
  }
`
