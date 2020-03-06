Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :users, only: [:create]
  post "login", to: "authentication#login"
  resources :cardios, only: [:index, :create, :destroy, :update]
  resources :weights, only: [:index, :create, :destroy, :update]
  resources :workouts, only: [:index, :create, :destroy, :update]
end
