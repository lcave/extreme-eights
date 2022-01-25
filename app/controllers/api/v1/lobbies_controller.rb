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
        lobby = Lobbies::Repository.find_or_join(friendly_id: params[:id], player: current_player)

        render json: {
          lobby: {
            id: lobby.friendly_id,
            lobby_leader_id: lobby.lobby_leader_id,
            players: lobby.player_names_and_ids,
          },
        }, status: :created
      end
    end
  end
end
