class CreateGames < ActiveRecord::Migration[7.0]
  def change
    create_table :games, id: :uuid do |t|
      t.string :lobby_id, null: false, unique: true
      t.jsonb :deck
      t.jsonb :discard
      t.jsonb :player_hands
      t.timestamps
    end
  end
end
