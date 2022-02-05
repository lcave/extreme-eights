class GamesChannel < ApplicationCable::Channel
  state_attr_accessor :game

  def subscribed
    current_player = Players::Authenticator.find_player_by_token(params[:token])

    self.game = Lobbies::Games::Game.find(params[:game_id])
    return reject unless game

    hand = game.hand_for(current_player.id)

    return reject unless hand

    stream_for game
  end

  def receive(data)
    current_player = Players::Authenticator.find_player_by_token(params[:token])
    type = data["type"]

    if type == "ready" && !game.started
      game.set_player_ready(current_player.id)
      if game.all_players_ready?
        5.times do |i|
          broadcast_to(
            game,
            {
              type: "starting_in",
              starting_in: 5 - i,
            },
          )
          sleep(1)
        end

        game.update!(started: true)

        broadcast_to(
          game,
          {
            type: "game_state",
            discard: game.discard_pile.top_card,
            current_player: game.player_hand_objects.first.player_id,
          },
        )
      else
        broadcast_to(
          game,
          {
            type: "waiting_for",
            waiting_for: game.disconnected_players,
          },
        )
      end
    end
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  private

  def current_player; end
end
