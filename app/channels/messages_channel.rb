class MessagesChannel < ApplicationCable::Channel
  state_attr_accessor :lobby

  def subscribed
    self.lobby = Lobbies::Lobby.find_by(friendly_id: params[:lobby_id])
    return reject unless lobby

    stream_for lobby
  end

  def receive(data)
    player = Players::Authenticator.find_player_by_token(data["sent_by"])

    message = Lobbies::Message.create!(
      lobby: lobby,
      player: player,
      body: data["body"],
    )

    broadcast_to(
      lobby,
      {
        body: message.body,
        author: player.name,
        player_id: player.id,
        sent_at: message.created_at,
      },
    )
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
