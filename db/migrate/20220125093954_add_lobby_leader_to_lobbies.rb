class AddLobbyLeaderToLobbies < ActiveRecord::Migration[7.0]
  def change
    add_column :lobbies, :lobby_leader_id, :uuid, null: false
  end
end
