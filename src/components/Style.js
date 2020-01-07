import styled from 'styled-components'

const Button = styled.button`
  background: silver;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid black;
  border-radius: 3px;
  `

const SmallButton = styled.button`
  background: silver;
  font-size: 0.75em;
  margin: 0.25em;
  padding: 0.1em 0.3em;
  border: 1px solid black;
  border-radius: 1px;
  `

const Input = styled.input`
  margin: 0.25em;
  `
const TextArea = styled.textarea`
  margin: 0.25em;
  `
const Page = styled.div`
  padding: 1em;
  background: mintcream;
  `
const Title = styled.div`
  background: steelblue;
  padding: 1em;
  border: 1px solid black;
  border-radius: 1px;
  margin: 1em;
  color: white;
  `

const Navigation = styled.div`
  background: skyblue;
  padding: 1em;
  border: 1px solid black;
  border-radius: 1px;
  `
const HappyNotification = styled.div`
  margin: 1em;
  padding: 0.5em 1.3em;
  border: 2px solid black;
  border-radius: 2px;
  background: white;
  `


const OneThread = styled.div`
  margin: 0.3em;
  padding: 0.5em 1em;
  border: 1px solid black;
  background: skyblue;
`

const CommentInformation = styled.div`
  margin: 0.5em;
  padding: 0.5em 1em;
  border: 1px solid black;
  background: skyblue;
  font-size: 0.75em;
  `
const CommentText = styled.div`

  padding: 0.5em 1em;
  border: 1px solid black;
  background: white;
  font-size: 1.2em;
  `

const DropdownMenuItem = styled.div`
  float: right;
  `

const DropdownMenuButton = styled.div`
  float: right;
  background: silver;
  font-size: 1em;
  border: 2px solid black;
  border-radius: 3px;
  padding: 0.1em 1em;
  `

const LogoutButton = styled.div`
  background: white;
  font-size: 1em;
  border: 1px solid white;
  `

const ThreadInformation = styled.div`
  font-size: 0.75em;
  `

export { ThreadInformation, LogoutButton, DropdownMenuItem, DropdownMenuButton, TextArea, Title, CommentInformation, CommentText, Button, Input, Page, Navigation, HappyNotification, OneThread, SmallButton }