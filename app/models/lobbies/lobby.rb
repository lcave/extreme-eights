module Lobbies
  class Lobby < ApplicationRecord
    has_many :lobby_accesses, class_name: "Lobbies::LobbyAccess"
    has_many :players, through: :lobby_accesses
    has_many :messages

    belongs_to :lobby_leader, class_name: "Players::Player"

    validates :lobby_leader_id, presence: true

    def player_names_and_ids
      players.map { |p| { name: p.name, id: p.id, leader: lobby_leader_id == p.id } }
    end

    def json_messages
      messages.map do |message|
        {
          id: message.id,
          body: message.body,
          author: message.player.name,
          player_id: message.player.id,
          sent_at: message.created_at,
        }
      end
    end
  end
end
