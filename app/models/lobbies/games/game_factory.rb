module Lobbies
  module Games
    module GameFactory
      def self.create!(lobby)
        lobby.game&.destroy!

        deck = Deck.new

        player_hands = []

        lobby.players.each do |player|
          player_hands << Lobbies::Games::PlayerHand.new(player.id)
        end
        player_hands.shuffle!

        deck.deal(player_hands)

        discard = deck.start_discard

        Game.create!(
          lobby: lobby,
          deck: deck,
          discard: discard,
          player_hands: player_hands,
          current_player_id: player_hands.first.player_id,
        )
      end
    end
  end
end
