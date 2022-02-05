module Lobbies
  module Games
    class Discard
      def initialize
        @discard = []
      end

      def add_card(card)
        @discard << card
      end

      def top_card
        @discard.last
      end

      def to_s
        @discard.map(&:to_s)
      end
    end
  end
end
