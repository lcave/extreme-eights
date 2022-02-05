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
          discard: game.discard,
        }, status: :created
      end

      def show
        game = lobby.game
        render json: {
          id: game.id,
          discard: game.discard,
        }, status: :ok
      end

      private

      def lobby
        Lobbies::Lobby.find_by(friendly_id: params[:lobby_id])
      end
    end
  end
end
