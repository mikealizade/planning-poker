import styled from '@emotion/styled'

export const Header = styled.header`
  padding: 15px 20px;
  display: flex;
`

export const VotingType = styled.div`
  display: flex;
  font-size: 1.2rem;
  color: #757778;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
  white-space: pre;
`

export const VotingTypeName = styled.div`
  text-transform: capitalize;
  color: #fff;
`

export const SessionName = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`

export const Account = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
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
  flex: 1;

  &:before {
    content: '';
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 2px solid #fcfeff;
    position: absolute;
    left: -25px;
    top: 5px;
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
    top: 5px;
  }
`
