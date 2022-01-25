module Api
  module V1
    class UsersController < ApplicationController
      skip_before_action :verify_authenticity_token

      def create
        player = Players::Factory.create!(player_params)
        render json: {
          player: {
            name: player.name,
            id: player.id,
            token: Players::Authenticator.issue_token(player),
          },
        }, status: :created
      end

      private

      def player_params
        params.require(:player).permit(:name)
      end
    end
  end
end
