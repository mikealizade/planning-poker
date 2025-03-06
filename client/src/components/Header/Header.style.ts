import styled from '@emotion/styled'

export const Header = styled.header`
  padding: 15px 20px;
  border-bottom: 1px solid #202226;
`

export const Title = styled.h1`
  color: #fcfeff;
  font-weight: bold;
  font-size: 1.2em;
  line-height: normal;
  position: relative;
  margin-left: 35px;
  display: flex;
  align-items: center;

  &:before {
    content: '';
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 2px solid #fcfeff;
    position: absolute;
    left: -25px;
    top: 2px;
  }

  &:after {
    content: '';
    width: 15px;
    height: 15px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: yellow;
    position: absolute;
    left: -35px;
    top: 2px;
  }
`
