Rails.application.routes.draw do
  devise_for :users
  post '/graphql', to: 'graphql#execute'
  root to: 'home#landing'
end
