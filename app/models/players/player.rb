module Players
  class Player < ActiveRecord::Base
    belongs_to :lobby, optional: true
  end
end
