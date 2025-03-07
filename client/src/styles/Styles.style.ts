import styled from '@emotion/styled'

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  justify-content: center;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  background: radial-gradient(circle, #26213b, #0f0f17);
  border-radius: 28px;
  flex: 1;
  margin: 80px 10%;
  width: 80%;
  max-width: 1350px;
`

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  padding: 30px;
  align-items: center;
  flex: 1;
  row-gap: 30px;
`

export const Button = styled.button`
  background-color: #5023e4;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.1rem;
  letter-spacing: 1px;
`

export const PageTitle = styled.h1`
  display: flex;
  font-size: 1.4rem;
  justify-content: center;
`

export const SessionUrl = styled.p`
  display: flex;
  font-size: 1rem;
  justify-content: flex-end;
  align-items: center;
  column-gap: 6px;
  margin-top: auto;
  color: #757778;
  cursor: pointer;

  &:hover {
    svg {
      color: #fff;
    }
  }
`

export const CenteredContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 30px;
  flex: 1;
  margin-bottom: 230px;
`

export const CreateSessionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 300px;
  row-gap: 10px;

  * {
    align-self: center;
    width: 100%;
  }
`

export const Input = styled.input`
  border-radius: 5px;
  background-color: #3a354a;
  padding: 11px 5px 11px 12px;
  border: 0;

  &::placeholder {
    color: #ececec;
    font-size: 1.2rem;
  }
`

export const ButtonText = styled.button`
  font-size: 1.1rem;
  border: 0;
  background: transparent;
  cursor: pointer;
  padding-left: 40px;
  color: initial;
  display: flex;
  align-items: center;
  column-gap: 6px;
`

export const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 20px;
`

export const TextWithIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 6px;
  font-size: 1.1rem;
  line-height: normal;
`
