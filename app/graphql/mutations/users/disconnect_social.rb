# frozen_string_literal: true

# Disconnect social network from user
class Mutations::Users::DisconnectSocial < Mutations::BaseAuthMutation
  field :errors, [String], null: false
  field :user, Types::UserType, null: true

  argument :provider, String, required: true

  def resolve(provider:)
    interactor = Users::Omniauth::DisconnectSocial.run(user: current_user, provider: provider)

    if interactor.valid?
      {
        user: interactor.result,
        errors: []
      }
    else
      {
        user: nil,
        errors: retrieve_errors(interactor)
      }
    end
  end
end
