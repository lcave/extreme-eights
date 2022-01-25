Rails.application.routes.draw do
  root "application#home"

  namespace :api do
    namespace :v1 do
      resource :users, only: %i[create update]
    end
  end
end
