# frozen_string_literal: true

# Mutation to update reseted password
class Mutations::Users::ForgotPasswordUpdate < Mutations::BaseNoAuthMutation
  field :errors, [String], null: false
  field :user, Types::UserType, null: true

  argument :password, String, required: true
  argument :password_confirmation, String, required: true
  argument :reset_password_token, String, required: true

  def resolve(password:, password_confirmation:, reset_password_token:)
    interactor = Users::ResetPassword.run(
      password: password,
      password_confirmation: password_confirmation,
      reset_password_token: reset_password_token
    )

    if interactor.valid?
      sign_in(interactor.result)

      {
        user: interactor.result,
        errors: []
      }
    else
      {
        user: nil,
        errors: interactor.errors.full_messages
      }
    end
  end
end
