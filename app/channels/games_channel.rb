class GamesChannel < ApplicationCable::Channel
  state_attr_accessor :game

  def subscribed
    current_player = Players::Authenticator.find_player_by_token(params[:token])

    self.game = Lobbies::Games::Game.find(params[:game_id])

    return reject unless game

    hand = Lobbies::Games::GameRepository.load(game).hand_for(current_player.id)

    return reject unless hand

    stream_for game
  end

  def receive(data)
    current_player = Players::Authenticator.find_player_by_token(params[:token])
    type = data["type"]
    game = Lobbies::Games::GameRepository.load(self.game)
    if type == "ready" && !game.started
      game.mark_player_ready(current_player.id)

      if game.all_players_ready?
        6.times do |i|
          broadcast_to(
            self.game,
            {
              starting_in: 5 - i,
            }.merge(game.game_state),
          )
          sleep(1)
        end
        game.update!(started: true)
      else
        broadcast_to(
          self.game,
          {
            type: "waiting_for",
            waiting_for: game.disconnected_players,
          },
        )
      end
    else
      broadcast_to(
        self.game,
        game.game_state,
      )
    end
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
