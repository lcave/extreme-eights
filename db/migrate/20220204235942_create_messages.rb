class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages, id: :uuid do |t|
      t.uuid :lobby_id
      t.uuid :player_id
      t.string :body, null: false
      t.timestamps
    end
  end
end
