module Players
  class Player < ApplicationRecord
    has_many :lobby_accesses, class_name: "Lobbies::LobbyAccess"
    has_one :lobby, through: :lobby_accesses
  end
end
