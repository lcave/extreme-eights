class AddCurrentPlayerToGames < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :current_player_id, :string, null: false
  end
end
