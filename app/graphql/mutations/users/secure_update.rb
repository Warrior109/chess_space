# frozen_string_literal: true

# Update user only if sended correct password
class Mutations::Users::SecureUpdate < Mutations::BaseAuthMutation
  field :user, Types::UserType, null: true
  field :errors, [String], null: false

  argument :first_name, String, required: false
  argument :last_name, String, required: false
  argument :email, String, required: false
  argument :new_password, String, required: false
  argument :new_password_confirmation, String, required: false

  argument :password, String, required: true

  def resolve(
    first_name: nil, last_name: nil,
    email: nil,
    new_password: nil, new_password_confirmation: nil,
    password:
  )
    interactor = Users::SecureUpdate.run(
      user: current_user,
      first_name: first_name, last_name: last_name,
      email: email,
      new_password: new_password, new_password_confirmation: new_password_confirmation,
      password: password
    )

    if interactor.valid?
      # After updating password system logout user, so we should to sign in again
      controller.bypass_sign_in(interactor.result) if new_password && new_password_confirmation

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
