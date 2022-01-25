require "jwt"

module Players
  module Authenticator
    JWT_SECRET = Rails.application.credentials.jwt[Rails.env.to_sym][:token_secret]

    def self.issue_token(user)
      JWT.encode(user.id, JWT_SECRET, "HS256")
    end

    def self.verify_token(token)
      !User.find_by(id: JWT.decode(token, JWT_SECRET, "HS256")).nil?
    end
  end
end
