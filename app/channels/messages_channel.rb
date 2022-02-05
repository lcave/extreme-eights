class MessagesChannel < ApplicationCable::Channel
  state_attr_accessor :lobby

  def subscribed
    self.lobby = Lobbies::Lobby.find_by(friendly_id: params[:lobby_id])
    return reject unless lobby

    stream_for lobby
  end

  def receive(data)
    current_player = Players::Authenticator.find_player_by_token(data["token"])

    message = Lobbies::Message.create!(
      lobby: lobby,
      player: current_player,
      body: data["body"],
    )

    broadcast_to(
      lobby,
      {
        type: "message",
        message: {
          id: message.id,
          body: message.body,
          author: message.player.name,
          player_id: message.player.id,
          sent_at: message.created_at,
        },
      },
    )
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
