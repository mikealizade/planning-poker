import styled from '@emotion/styled'

// export const Button = styled.button`
//   display: flex;
//   justify-content: center;
//   background-color: #0f0f17;
//   border: 1px solid yellow;
//   font-size: 1.2rem;
//   border-radius: 40px;
//   padding: 10px 20px;
//   cursor: pointer;
//   color: #fff;
// `

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
    /* opacity: 0.7; */
    font-size: 1.2rem;
  }
`
