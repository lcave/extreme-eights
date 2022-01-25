module Lobbies
  module Repository
    def self.find_or_join(friendly_id:, player:)
      lobby = Lobby.find_by!(friendly_id: friendly_id)

      return lobby if lobby.players.include?(player)

      LobbyAccess.create!(
        player: player,
        lobby: lobby,
      )

      lobby
    end

    def self.my_lobbies(player)
      Lobby.joins(:lobby_accesses).where(lobby_accesses: { player_id: player.id })
    end
  end
end
