module Players
  class Player < ApplicationRecord
    belongs_to :lobby, class_name: "Lobbies::Lobby", optional: true

    validates :name, presence: true, length: { maximum: 50, minimum: 1 }
  end
end
