module Lobbies
  class Lobby < ActiveRecord::Base
    has_many :players
  end
end
