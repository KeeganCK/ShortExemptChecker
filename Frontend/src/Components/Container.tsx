import React from 'react'
import styled from 'styled-components'

const ContainerDiv = styled.div`
	margin: auto;
	margin-top: 2em;
	width: 50%
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