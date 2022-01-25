class ApplicationController < ActionController::Base
  def home; end

  def current_user
    Players::Authenticator.find_player_by_token(request.headers["Authentication"])
  end
end
