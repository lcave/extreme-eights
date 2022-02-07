module Lobbies
  module Games
    class Rules
      def initialize(game)
        @game = game
      end

      def validate_move!(player_id, current_card, new_card)
        return unless current_card

        if current_card.colour == new_card.colour && current_card.value == new_card.value
          @game.skip_to(player_id)
          return true
        end

        raise StandardError, "Invalid move: #{new_card} => #{current_card}" unless @game.current_player_id == player_id

        valid = new_card.colour == Card::WILD_COLOUR || (current_card.colour == new_card.colour || current_card.value == new_card.value)

        raise StandardError, "Invalid move: #{new_card} => #{current_card}" unless valid
      end
    end
  end
end
