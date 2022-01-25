module Lobbies
  module Repository
    def self.find_or_join(friendly_id:, player:)
      lobby = Lobby.find_by!(friendly_id: friendly_id)

      return lobby if lobby.players.include?(player)

      player.update!(lobby_id: lobby.id)

      lobby
    end
  end
end
