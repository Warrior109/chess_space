# frozen_string_literal: true

# User registration.
# If registration successfully completed - sign in user
class Mutations::Users::SignUp < Mutations::BaseNoAuthMutation
  field :user, Types::UserType, null: true
  field :errors, [String], null: false

  argument :first_name, String, required: true
  argument :last_name, String, required: true
  argument :email, String, required: true
  argument :password, String, required: true
  argument :password_confirmation, String, required: true

  def resolve(
    first_name:, last_name:, email:, password:, password_confirmation:
  )
    interactor = Users::Create.run(
      first_name: first_name, last_name: last_name, email: email, password: password,
      password_confirmation: password_confirmation
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
