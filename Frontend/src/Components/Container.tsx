import React from 'react'
import styled from 'styled-components'

const ContainerDiv = styled.div`
	margin: auto;
	margin-top: 2em;
	width: 80%;
  /* @media(max-width: 1300px) {
    width: 80%;
  } */
  display: flex;
  flex-direction: column;
  align-items: center;
`

type Props = {
  children: string | JSX.Element | JSX.Element[]
}

const Container = ({children}: Props) => {
  return (
    <ContainerDiv>{children}</ContainerDiv>
  )
}

export default Container