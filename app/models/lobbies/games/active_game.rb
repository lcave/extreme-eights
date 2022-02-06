module Lobbies
  module Games
    class ActiveGame
      attr_reader :deck, :discard, :player_hands, :game

      def initialize(game)
        load_game_state(game)
      end

      def start!
        @game.started = true

        @game.update(
          deck: @deck,
          discard: @discard,
          player_hands: @player_hands,
        )

        load_game_state(@game.reload)
      end

      def save_game_state!
        @game.update(
          deck: @deck,
          discard: @discard,
          player_hands: @player_hands,
        )

        load_game_state(@game.reload)

        return unless @game.started

        GamesChannel.broadcast_to(
          @game,
          game_state,
        )
      end

      def draw_card_for(player_id)
        hand_for(player_id).add_card(@deck.draw_card)
        save_game_state!
      end

      def hand_for(player_id)
        @player_hands.find { |hand| hand.player_id == player_id }
      end

      def mark_player_ready(player_id)
        hand_for(player_id).connected = true
        save_game_state!
      end

      def all_players_ready?
        @player_hands.filter { |hand| hand.connected == false }.empty?
      end

      def disconnected_players
        Players::Player.find(
          @player_hands.map(&:player_id),
        ).map(&:name)
      end

      def players_hash
        @game.players.map do |p|
          {
            name: p.name,
            id: p.id,
            leader: @game.lobby.lobby_leader_id == p.id,
            card_count: hand_for(p.id).hand.size,
            hand: encrypt_hand(p, hand_for(p.id)),
          }
        end
      end

      def encrypt_hand(_player, hand)
        Base64.strict_encode64(hand.hand.to_json)
      end

      def method_missing(method, *args)
        @game.public_send(method, *args)
      end

      def game_state
        {
          type: "game_state",
          game_state: {
            discard: @discard.top_card,
            current_player: @player_hands.first.player_id,
            players: players_hash,
          },
        }
      end

      private

      def load_game_state(game)
        @game = game
        @deck = Deck.from_array(game.deck["deck"])
        @discard = Discard.from_hash(game.discard)
        @player_hands = @game.player_hands.map do |hand|
          Lobbies::Games::PlayerHand.from_hash(hand)
        end
      end
    end
  end
end
