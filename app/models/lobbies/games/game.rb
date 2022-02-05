module Lobbies
  module Games
    class Game < ApplicationRecord
      belongs_to :lobby
      has_many :players, class_name: "Players::Player", through: :lobby

      validates :players, length: { minimum: 2, maximum: 8 }

      def discard_pile
        Discard.from_array(discard)
      end

      def hand_for(player_id)
        player_hand_objects.find { |hand| hand.player_id == player_id }
      end

      def player_hand_objects
        player_hands.map do |hand|
          Lobbies::Games::PlayerHand.from_hash(hand)
        end
      end

      def set_player_ready(player_id)
        player_hands.find { |hand| hand["player_id"] == player_id }["connected"] = true
        save!
      end

      def all_players_ready?
        player_hand_objects.filter { |hand| hand.connected == false }.empty?
      end

      def disconnected_players
        Players::Player.find(
          player_hand_objects.filter { |hand| hand.connected == false }.map(&:player_id),
        ).map(&:name)
      end
    end
  end
end
