module Lobbies
  class Lobby < ActiveRecord::Base
    has_many :players, class_name: "Players::Player"
    belongs_to :lobby_leader, class_name: "Players::Player"

    validates :lobby_leader_id, presence: true

    def player_names_and_ids
      players.map { |p| { name: p.name, id: p.id } }
    end
  end
end
