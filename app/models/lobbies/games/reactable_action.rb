module Lobbies
  module Games
    class ReactableAction
      CHOOSE_COLOUR = "choose_colour".freeze
      SWAP_HAND = "swap_hand".freeze
      STACK_PLUS = "stack_plus".freeze
      STACK_PLUS_CHOOSE_COLOUR = "stack_plus_choose_colour".freeze

      attr_accessor :player_id, :action_type, :details

      def initialize(player_id, action_type, details = {})
        @player_id = player_id
        @action_type = action_type
        @details = details
      end

      def resolve_action(player_id, game, details:)
        raise StandardError, "Not authorised to resolve this action" unless player_id == @player_id

        __send__("#{action_type}_resolver", game, details)
      end

      def self.from_hash(hash)
        return unless hash

        new(
          hash["player_id"],
          hash["action_type"],
          hash["details"],
        )
      end

      private

      def choose_colour_resolver(game, details)
        colour = details["colour"]
        raise StandardError, "Invalid colour #{colour}" unless Card::COLOURS.include?(colour)

        game.discard.top_card.colour = colour
        game.reactable_action = nil
        game.next_player!
      end

      def swap_hand_resolver(victim_id)
        # do the thing
      end

      def stack_plus_resolver(game, _action)
        @details["total"].times do
          game.draw_card_for(@player_id)
        end
        game.reactable_action = nil
        game.next_player!
      end

      def stack_plus_choose_colour_resolver(game, details)
        colour = details["colour"]
        raise StandardError, "Invalid colour #{colour}" unless Card::COLOURS.include?(colour)

        game.discard.top_card.colour = colour

        game.reactable_action = ReactableAction.new(
          game.next_player,
          STACK_PLUS,
          {
            total: @details["total"],
          },
        )
        game.next_player!
      end
    end
  end
end
