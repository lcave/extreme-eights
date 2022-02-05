module Api
  module V1
    class LobbiesController < ApplicationController
      skip_before_action :verify_authenticity_token

      def create
        lobby = Lobbies::Factory.create!(current_player)
        render json: {
          lobby_id: lobby.friendly_id,
        }, status: :created
      end

      def show
        lobby = Lobbies::Repository.join(friendly_id: params[:id], player: current_player)

        MessagesChannel.broadcast_to(
          lobby,
          {
            type: "players",
            players: lobby.player_names_and_ids,
          },
        )

        render json: {
          lobby: {
            id: lobby.friendly_id,
            lobby_leader_id: lobby.lobby_leader_id,
            players: lobby.player_names_and_ids,
            messages: lobby.json_messages,
          },
        }, status: :created
      end

      def index
        render json: {
          available_lobbies: [
            {
              id: current_player.lobby.friendly_id,
              lobby_leader_name: current_player.lobby.lobby_leader.name,
              player_count: current_player.lobby.players.count,
            },
          ],
        }, status: :ok
      end
    end
  end
end
