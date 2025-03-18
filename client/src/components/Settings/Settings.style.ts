import styled from '@emotion/styled'

export const SettingsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  column-gap: 20px;

  > div,
  button {
    flex: 1;
  }

  svg {
    color: #fff;
    font-size: 1.5rem;
    cursor: pointer;
  }
`

export const LeaveButton = styled.button`
  background: transparent;
  border: 0;
  margin-right: auto;
`
