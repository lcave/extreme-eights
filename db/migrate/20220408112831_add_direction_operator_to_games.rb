class AddDirectionOperatorToGames < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :direction_operator, :string, default: "+"
  end
end
