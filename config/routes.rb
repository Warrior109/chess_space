# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users

  mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/graphql' if Rails.env.development?

  post '/graphql', to: 'graphql#execute'
  namespace :users do
    resource :edit, only: [] do
      get :common
      get :contacts
    end
  end

  root to: 'home#landing'
end
