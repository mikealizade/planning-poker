import styled from '@emotion/styled'

export const Label = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`

export const Select = styled.select`
  appearance: none; /* Remove default styles */
  -webkit-appearance: none;
  -moz-appearance: none;

  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #3a354a;
  border-radius: 5px;
  background-color: #3a354a;
  color: #ececec;
  cursor: pointer;

  /* Add an arrow icon */
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='gray'><path d='M5 7l5 5 5-5H5z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 12px;
  padding-right: 30px; /* Space for the arrow */
`
