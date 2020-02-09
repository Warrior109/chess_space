# frozen_string_literal: true

# Update user only if sended correct password
class Mutations::Users::SecureUpdate < Mutations::BaseAuthMutation
  field :user, Types::UserType, null: true
  field :errors, [String], null: false

  argument :first_name, String, required: false
  argument :last_name, String, required: false
  argument :email, String, required: false

  argument :password, String, required: true

  def resolve(first_name: nil, last_name: nil, email: nil, password:)
    interactor = Users::SecureUpdate.run(
      user: current_user,
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password
    )

    if interactor.valid?
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
