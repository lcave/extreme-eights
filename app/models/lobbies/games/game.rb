module Lobbies
  module Games
    class Game < ApplicationRecord
      belongs_to :lobby
      has_many :players, class_name: "Lobbies::Player", through: :lobby
    end
  end
end
