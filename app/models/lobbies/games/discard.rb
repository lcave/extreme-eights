module Lobbies
  module Games
    class Discard
      def initialize(cards: [])
        @discard = cards
      end

      def self.from_hash(hash)
        new(cards: hash["discard"].map { |card| Card.new(**card.symbolize_keys) })
      end

      def add_card(card)
        @discard << card
      end

      def top_card
        @discard.last
      end
    end
  end
end
