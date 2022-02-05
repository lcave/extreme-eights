module Lobbies
  module Games
    class Discard
      def initialize
        @discard = []
      end

      def self.from_array(arr)
        discard = new
        arr.each do |card|
          binding.pry
          discard.add_card(Card.new(**card))
        end
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
