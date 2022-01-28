module Players
  class Player < ApplicationRecord
    has_many :lobby_accesses, class_name: "Lobbies::LobbyAccess"
    has_one :lobby, through: :lobby_accesses

    validates :name, presence: true, length: { maximum: 50, minimum: 1 }
  end
end
