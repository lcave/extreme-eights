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
          @game.reactable_action = nil
          return true
        end

        raise StandardError, "Invalid move: #{new_card} => #{current_card}" unless @game.current_player_id == player_id
        raise StandardError, "Incomplete reactable action" unless @game.reactable_action.nil? || (new_card.value == "PICKUP_MINOR" || new_card.value == "PICKUP_MAJOR")

        valid = new_card.colour == Card::WILD_COLOUR || (current_card.colour == new_card.colour || current_card.value == new_card.value)

        raise StandardError, "Invalid move: #{new_card} => #{current_card}" unless valid
      end

      def execute_move!(player_id, card_to_play, discard)
        discard.add_card(card_to_play)

        if Card::NUM_VALUES.include?(card_to_play.value)
          @game.next_player!
          nil
        else
          next_player_in_roation_id = @game.next_player

          case card_to_play.value
          when "REVERSE"
            @game.direction_operator = @game.direction_operator == "+" ? "-" : "+"
          when "ROTATE"
            spare_hand = nil
            rotated_hands = @game.player_hands.map do |hand|
              if spare_hand.nil?
                spare_hand = hand.hand
                hand.hand = nil
              else
                tmp_hand = hand.hand
                hand.hand = spare_hand
                spare_hand = tmp_hand
              end
              hand
            end
            raise StandardError, "No spare hand" if spare_hand.nil?

            hand = rotated_hands.find { |h| h.hand.nil? }
            raise StandardError, "A hand was duplciated" if spare_hand.nil?

            hand.hand = spare_hand
            @game.player_hands = rotated_hands
          when "SWAP"
            ReactableAction.new(player_id, ReactableAction::SWAP_HAND)
            return
          when "SKIP"
            @game.next_player!
          when "PICKUP_MINOR", "PICKUP_MAJOR"
            if @game.reactable_action
              @game.reactable_action.player_id = next_player_in_roation_id
              @game.reactable_action.details = {
                "total" => @game.reactable_action.details["total"] + (card_to_play.value == "PICKUP_MAJOR" ? 4 : 2),
              }
            else
              @game.reactable_action = ReactableAction.new(
                next_player_in_roation_id,
                ReactableAction::STACK_PLUS,
                { total: card_to_play.value == "PICKUP_MAJOR" ? 4 : 2 },
              )
            end
          when "WILD"
            @game.reactable_action = ReactableAction.new(
              player_id,
              ReactableAction::CHOOSE_COLOUR,
            )
            return
          end

          @game.next_player!
        end
      end
    end
  end
end
