Rails.application.routes.draw do
  resources :trips, only: [:show, :index, :create] do
    resources :stops, only: [:index]
  end
  resources :stops, only: [:create]
  resources :users, only: [:show]
  resources :recommendations, only: [:show]
  get "/me", to: "users#show"
  post "/signup", to: "users#create"

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy" 
  post "/login", to: "sessions#create"
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
