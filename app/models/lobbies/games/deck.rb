module Lobbies
  module Games
    class Deck
      def initialize(is_new_deck: true)
        @deck = []

        return unless is_new_deck

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

        @deck = @deck.shuffle
      end

      def self.from_array(arr)
        Deck.new(is_new_deck: false).load_deck(arr)
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
        cards = []
        cards << draw_card until Card::NUM_VALUES.include?(cards.last&.value)
        Discard.new(cards: cards)
      end

      def draw_card
        @deck.shift
      end
    end
  end
end
