# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users,
    only: :omniauth_callbacks, controllers: {omniauth_callbacks: 'users/omniauth_callbacks'}

  mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/graphql' if Rails.env.development?

  post '/graphql', to: 'graphql#execute'
  resource :users, only: [] do
    get :my_profile
  end
  namespace :users do
    resource :edit, only: [] do
      get :common
      get :contacts
      get :security
    end
  end

  root to: 'home#landing'
end
