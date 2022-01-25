module Lobbies
  class LobbyAccess < ApplicationRecord
    belongs_to :player, class_name: "Players::Player"
    belongs_to :lobby, class_name: "Lobbies::Lobby"
  end
end
