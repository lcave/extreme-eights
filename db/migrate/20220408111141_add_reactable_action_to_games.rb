class AddReactableActionToGames < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :reactable_action, :jsonb
  end
end
