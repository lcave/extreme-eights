module Lobbies
  module Games
    class Game < ApplicationRecord
      belongs_to :lobby
      has_many :players, through: :lobby
    end
  end
end
