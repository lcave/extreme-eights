module Lobbies
  module Games
    class ActiveGame
      attr_reader :deck, :discard, :game
      attr_accessor :direction_operator, :player_hands, :reactable_action

      def initialize(game)
        load_game_state(game)
        @rules = Rules.new(self)
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
          direction_operator: @direction_operator,
          reactable_action: @reactable_action,
          discard: @discard,
          player_hands: @player_hands,
          current_player_id: @current_player_id,
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

      def play_card_for(player_id, card_id)
        card_to_play = hand_for(player_id).play_card(card_id)

        @rules.validate_move!(player_id, @discard.top_card, card_to_play)
        @rules.execute_move!(player_id, card_to_play, @discard)

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
            reactable_action: @reactable_action,
            discard: @discard.top_card,
            current_player: @current_player_id,
            players: players_hash,
          },
        }
      end

      def skip_to(player_id)
        @current_player_id = player_id
      end

      def next_player
        current_player_index = @player_hands.find_index { |hand| hand.player_id == @current_player_id }
        next_player_index = current_player_index.public_send(@direction_operator, 1)

        new_index = if next_player_index.negative?
                      @player_hands.size - 1
                    elsif next_player_index == @player_hands.size
                      0
                    else
                      next_player_index
                    end

        @player_hands[new_index].player_id
      end

      def next_player!
        @current_player_id = next_player
      end

      def resolve_reactable_action(player_id, details)
        @reactable_action.resolve_action(player_id, self, details: details)
        save_game_state!
      end

      private

      def load_game_state(game)
        @game = game
        @direction_operator = game.direction_operator
        @reactable_action = ReactableAction.from_hash(game.reactable_action)
        @deck = Deck.from_array(game.deck["deck"])
        @discard = Discard.from_hash(game.discard)
        @player_hands = @game.player_hands.map do |hand|
          Lobbies::Games::PlayerHand.from_hash(hand)
        end
        @current_player_id = game.current_player_id
      end
    end
  end
end
