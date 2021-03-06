module Lobbies
  module Games
    class Card
      WILD_COLOUR = "WILD".freeze

      COLOURS = %w[
        RED
        BLUE
        GREEN
        YELLOW
      ].freeze

      NUM_VALUES = %w[
        2
        3
        4
        5
        6
        7
        8
        9
      ]

      COLOURED_VALUES = (NUM_VALUES + %w[
        REVERSE
        ROTATE
        SWAP
        SKIP
        PICKUP_MINOR
      ]).freeze

      WILD_ACTION_VALUES = %w[
        PICKUP_MAJOR
        WILD
      ].freeze

      attr_accessor :colour, :value, :id

      def initialize(colour:, value:, id: nil)
        @id = id
        @colour = colour
        @value = value
      end

      def to_s
        { colour: @colour, value: @value }.to_s
      end
    end
  end
end
