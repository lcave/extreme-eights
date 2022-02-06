Rails.application.routes.draw do
  root "application#home"

  namespace :api do
    namespace :v1 do
      resource :users, only: %i[create]
      resources :lobbies, only: %i[create show index] do
        resource :game, only: %i[create] do
          post :play, to: "games#play_card"
          get :draw, to: "games#draw_card"
        end
        get :game, to: "games#show"
      end
    end
  end

  get "*path", to: "application#home"
end
