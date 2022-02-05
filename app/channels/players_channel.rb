class PlayersChannel < ApplicationCable::Channel
  state_attr_accessor :player

  def subscribed
    self.player = Players::Authenticator.find_player_by_token(params[:token])

    game = player.lobby.game
    return reject unless game

    hand = game.hand_for(player.id)
    return reject unless hand

    stream_for player
  end

  def receive(data)
    if data["type"] == "get_hand"
      broadcast_to(
        player,
        {
          type: "get_hand",
          cards: player.hand,
        },
      )
    end
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
