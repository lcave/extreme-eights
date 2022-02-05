module Lobbies
  module Games
    class Deck
      def initialize
        deck = []

        Card::COLOURS.each do |colour|
          2.times do
            Card::COLOURED_VALUES.each do |value|
              deck << Card.new(colour, value)
            end
          end
        end

        Card::WILD_ACTION_VALUES.each do |value|
          deck << Card.new("WILD", value)
        end

        @deck = deck.shuffle
      end

      def deal(player_hands)
        14.times do
          player_hands.each do |hand|
            hand.add_card(draw_card)
          end
        end
      end

      def start_discard
        discard = Discard.new
        discard.add_card(draw_card) until Card::NUM_VALUES.include?(discard.top_card&.value)
        discard
      end

      def draw_card
        @deck.shift
      end

      def to_s
        @deck.map(&:to_s)
      end
    end
  end
end
