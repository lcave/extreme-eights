module Lobbies
  module Games
    module GameRepository
      def self.load(game)
        game.deck = Deck.from_array(game.deck["deck"])

        game.player_hands = game.player_hands.map do |hand|
          Lobbies::Games::PlayerHand.from_hash(hand)
        end

        game.discard = Discard.from_hash(game.discard)

        ActiveGame.new(game)
      end
    end
  end
end
