module Lobbies
  class Message < ApplicationRecord
    belongs_to :lobby
    belongs_to :player, class_name: "Players::Player"

    validates :body, presence: true, length: { minimum: 1 }
  end
end
