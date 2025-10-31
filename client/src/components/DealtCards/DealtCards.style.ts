import styled from '@emotion/styled'

export const CardsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 85px;
`

export const DealtCard = styled.div`
  background-color: #e4e5f5;
  border-radius: 4px;
  width: 70px;
  height: 100px;
  color: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
`

export const DealtCardInner = styled.div`
  position: relative;
  transition: transform 0.4s;
  transform-style: preserve-3d;
`

export const FlippedCard = styled.div`
  position: absolute;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;

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
