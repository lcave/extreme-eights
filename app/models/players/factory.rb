module Players
  module Factory
    def self.create!(user_params)
      Player.create!(user_params)
    end
  end
end
