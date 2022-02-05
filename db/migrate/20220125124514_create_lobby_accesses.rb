class CreateLobbyAccesses < ActiveRecord::Migration[7.0]
  def change
    create_table :lobby_accesses, id: :uuid do |t|
      t.uuid :player_id
      t.uuid :lobby_id
      t.timestamps
    end
  end
end
