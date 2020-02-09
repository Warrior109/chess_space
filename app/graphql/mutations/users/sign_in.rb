# frozen_string_literal: true

# Mutation for sign in user into the system
class Mutations::Users::SignIn < Mutations::BaseNoAuthMutation
  field :user, Types::UserType, null: true
  field :errors, [String], null: false

  # email and password params cames from params to warden
  def resolve
    controller.allow_params_authentication!
    user = controller.warden.authenticate(scope: :user)

    if user
      sign_in(user)
      {
        user: user,
        errors: []
      }
    else
      error_key = controller.warden.winning_strategy.message
      {
        user: nil,
        errors: [I18n.t("devise.failure.#{error_key}", authentication_keys: :email)]
      }
    end
  end
end
