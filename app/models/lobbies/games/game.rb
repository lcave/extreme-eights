module Lobbies
  module Games
    class Game < ApplicationRecord
      belongs_to :lobby
      has_many :players, through: :lobby

      validates :current_player_id, presence: true
    end
  end
end
