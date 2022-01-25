class AddFriendlyIdToLobbies < ActiveRecord::Migration[7.0]
  def change
    add_column :lobbies, :friendly_id, :string, null: false
    add_index :lobbies, :friendly_id, unique: true
  end
end
