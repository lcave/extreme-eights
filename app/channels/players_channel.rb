class PlayersChannel < ApplicationCable::Channel
  state_attr_accessor :player

  def subscribed
    self.player = Players::Authenticator.find_player_by_token(params[:token])

    game = Lobbies::Games::GameRepository.load(player.lobby.game)

    return reject unless game

    stream_for player
  end

  def receive(data)
    game = Lobbies::Games::GameRepository.load(player.lobby.game)

    game.draw_card_for(player.id) if data["type"] == "draw_card"

    broadcast_to(
      player,
      {
        type: "get_hand",
        cards: game.hand_for(player.id).hand,
      },
    )
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
