module Api
  module V1
    class GamesController < ApplicationController
      skip_before_action :verify_authenticity_token

      def create
        game = Lobbies::Games::GameFactory.create!(lobby)

        MessagesChannel.broadcast_to(
          lobby,
          {
            type: "game_starting",
          },
        )

        render json: {
          game_id: game.id,
        }, status: :created
      end

      def draw_card
        Lobbies::Games::GameRepository.load(
          current_player.lobby.game,
        ).draw_card_for(current_player.id)
      end

      def play_card
        Lobbies::Games::GameRepository.load(
          current_player.lobby.game,
        ).play_card_for(current_player.id, params[:card_id])
      end

      def reactable_action
        Lobbies::Games::GameRepository.load(
          current_player.lobby.game,
        ).resolve_reactable_action(current_player.id, reactable_action_params)
      end

      def show
        game = lobby.game
        render json: {
          id: game.id,
        }, status: :ok
      end

      private

      def reactable_action_params
        params.require(:game).permit(:colour, :action)
      end

      def lobby
        Lobbies::Lobby.find_by(friendly_id: params[:lobby_id])
      end
    end
  end
end
