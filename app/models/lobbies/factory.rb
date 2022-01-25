require "spicy-proton"

module Lobbies
  module Factory
    def self.create!(creator)
      valid_id = false
      friendly_id = nil
      until valid_id
        friendly_id = Spicy::Proton.format("%a-%a-%n")
        valid_id = true unless Lobby.find_by(id: friendly_id)
      end

      ActiveRecord::Base.transaction do
        lobby = Lobby.create!(
          lobby_leader_id: creator.id,
          id: friendly_id,
        )

        creator.update!(lobby_id: lobby.id)

        lobby
      end
    end
  end
end
