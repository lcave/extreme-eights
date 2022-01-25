class ApplicationController < ActionController::Base
  rescue_from InvalidTokenError, with: :unauthorised

  def home; end

  def current_player
    Players::Authenticator.find_player_by_token(request.headers["Authentication"])
  end

  private

  def unauthorised
    render json: {}, status: :unauthorized
  end
end
