module Lobbies
  module Games
    class Deck
      def initialize(new: true)
        @deck = []

        if new
          Card::COLOURS.each do |colour|
            2.times do
              Card::COLOURED_VALUES.each do |value|
                @deck << Card.new(colour: colour, value: value)
              end
            end
          end

          Card::WILD_ACTION_VALUES.each do |value|
            @deck << Card.new(colour: "WILD", value: value)
          end

          @deck.shuffle
        end
      end

      def self.from_array(arr)
        Deck.new(new: false).load_deck(arr)
      end

      def load_deck(arr)
        @deck = arr.map do |card|
          Card.new(**card.symbolize_keys)
        end

        self
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
    end
  end
end
