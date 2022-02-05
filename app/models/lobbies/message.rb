module Lobbies
  class Message < ApplicationRecord
    belongs_to :lobby
    belongs_to :player, class_name: "Players::Player"
  end
end
