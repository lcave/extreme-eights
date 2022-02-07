module Lobbies
  module Games
    class PlayerHand
      attr_accessor :hand, :player_id, :connected

      def initialize(player_id)
        @player_id = player_id
        @hand = []
        @connected = false
      end

      def self.from_hash(hash)
        hand = new(
          hash["player_id"],
        )
        hand.hand = hash["hand"].map { |card| Card.new(**card.symbolize_keys) }
        hand.connected = hash["connected"]

        hand.sort_hand
        hand
      end

      def add_card(card)
        card.id = SecureRandom.uuid
        @hand << card
        sort_hand
      end

      def play_card(card_id)
        card = @hand.find { |c| c.id == card_id }
        @hand.delete(card)
      end

      def sort_hand
        @hand.sort! { |a, b| a.colour <=> b.colour }
      end
    end
  end
end
