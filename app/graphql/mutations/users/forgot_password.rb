# frozen_string_literal: true

# Mutation to send reset password instructions to user
class Mutations::Users::ForgotPassword < Mutations::BaseNoAuthMutation
  field :errors, [String], null: false

  argument :email, String, required: true

  def resolve(email:)
    interactor = Users::SendResetPasswordInstructions.run(email: email)
    if interactor.valid?
      {
        errors: []
      }
    else
      {
        errors: retrieve_errors(interactor)
      }
    end
  end
end
