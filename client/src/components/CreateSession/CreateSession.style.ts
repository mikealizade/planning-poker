import styled from '@emotion/styled'

export const Button = styled.button`
  display: flex;
  justify-content: center;
  background-color: #0f0f17;
  border: 1px solid yellow;
  font-size: 1.2rem;
  border-radius: 40px;
  padding: 10px 20px;
  cursor: pointer;
  color: #fff;
`

export const PageTitle = styled.h1`
  display: flex;
  font-size: 1.4rem;
  justify-content: center;
`

export const CenteredContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 30px;
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
