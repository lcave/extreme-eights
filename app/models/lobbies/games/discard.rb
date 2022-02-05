module Lobbies
  module Games
    class Discard
      def initialize
        @discard = []
      end

      def self.from_hash(hash)
        discard = new
        hash["discard"].each do |card|
          discard.add_card(Card.new(**card.symbolize_keys))
        end

        discard
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
