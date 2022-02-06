module Lobbies
  module Games
    class Rules
      def self.valid_discard?(current_card, new_card)
        return unless current_card

        valid = new_card.colour == Card::WILD_COLOUR || (current_card.colour == new_card.colour || current_card.value == new_card.value)
        raise StandardError, "Invalid move: #{new_card} => #{current_card}" unless valid
      end
    end
  end
end
