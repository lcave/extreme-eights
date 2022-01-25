module Lobbies
  class Lobby < ApplicationRecord
    has_many :lobby_accesses, class_name: "Lobbies::LobbyAccess"
    has_many :players, through: :lobby_accesses

    belongs_to :lobby_leader, class_name: "Players::Player"

    validates :lobby_leader_id, presence: true

    def player_names_and_ids
      players.map { |p| { name: p.name, id: p.id } }
    end
  end
end
