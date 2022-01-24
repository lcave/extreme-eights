import React from 'react'
import { useEffect, useState } from 'react'
import MessagesChannel from '../channels/messages_channel'

export default function RootApp() {
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    MessagesChannel.received = (data) => setMessages(data.messages)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Add the X-CSRF-TOKEN token so rails accepts the request
    await fetch('http://localhost:3000/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('[name=csrf-token]').content,
      },
      body: JSON.stringify({ message }),
    })
    setMessage('')
  }

  return (
    <div>
      <input type="text" value={message} onChange={({ target: { value } }) => setMessage(value)} />
      <button onClick={handleSubmit}>Send message</button>

      <ul>
        {messages.map((message) => (
          <li key={message.id}>{message.content}</li>
        ))}
      </ul>
    </div>
  )
}