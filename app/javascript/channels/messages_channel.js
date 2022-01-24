import {createCable, createChannel} from './utils'

const MessagesChannel = createChannel('MessagesChannel', {
  connected() {
    console.log("connected")
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    // Called when there's incoming data on the websocket for this channel
  },
})

export default MessagesChannel