module Lobbies
  module Games
    class PlayerHand
      attr_accessor :hand, :player_id

      def initialize(player)
        @player_id = player.id
        @hand = []
      end

      def add_card(card)
        @hand << card
      end
    end
  end
end
