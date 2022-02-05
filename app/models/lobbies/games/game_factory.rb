module Lobbies
  module Games
    module GameFactory
      def self.create!(lobby)
        deck = Deck.new

        player_hands = []

        lobby.players.each do |player|
          player_hands << Lobbies::Games::PlayerHand.new(player)
        end

        deck.deal(player_hands)

        discard = deck.start_discard

        Game.create!(
          lobby: lobby,
          deck: deck,
          discard: discard,
          player_hands: player_hands,
        )
      end
    end
  end
end
