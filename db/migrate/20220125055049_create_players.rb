class CreatePlayers < ActiveRecord::Migration[7.0]
  def change
    enable_extension 'pgcrypto'
    create_table :players, id: :uuid do |t|
      t.string :name, null: false
      t.uuid :lobby_id
      t.timestamps
    end
  end
end
