import React from 'react'
import { useEffect, useState } from 'react'
import CreatePlayer from './Authentication/CreatePlayer'
import { currentPlayer, setCurrentPlayer } from './Authentication/currentPlayer'

export default function RootApp() {
  const [player, setPlayer] = useState(null)

  const handlePlayerCreation = (player) => {
    setCurrentPlayer(player)
    setPlayer(currentPlayer)
  }

  useEffect(() => {
    setPlayer(currentPlayer)
  }, [])

  if(player){
    return ( player.name)
  } else {
    return (
      <CreatePlayer createPlayerCallback={handlePlayerCreation}/>
    )
  }
}