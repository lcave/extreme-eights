class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|
      t.uuid :lobby_id
      t.uuid :player_id
      t.string :body
      t.timestamps
    end
  end
end
