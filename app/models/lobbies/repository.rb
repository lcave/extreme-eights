module Lobbies
  module Repository
    def self.join(friendly_id:, player:)
      lobby = Lobby.find_by!(friendly_id: friendly_id)

      return lobby if lobby.id == player.lobby_id

      player.update!(
        lobby_id: lobby.id,
      )

      lobby
    end
  end
end
