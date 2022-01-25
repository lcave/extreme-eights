require "jwt"

module Players
  module Authenticator
    JWT_SECRET = Rails.application.credentials.jwt[Rails.env.to_sym][:token_secret]

    def self.issue_token(player)
      JWT.encode(player.id, JWT_SECRET, "HS256")
    end

    def self.find_player_by_token(token)
      Player.find_by(id: JWT.decode(token, JWT_SECRET, "HS256"))
    rescue JWT::DecodeError
      raise InvalidTokenError
    end

    def self.verify_token(token)
      !find_player_by_token(token).nil?
    end
  end
end
