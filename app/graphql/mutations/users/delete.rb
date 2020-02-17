# frozen_string_literal: true

# Mutation to destroy current user
class Mutations::Users::Delete < Mutations::BaseAuthMutation
  field :errors, [String], null: false

  argument :password, String, required: true

  def resolve(password:)
    interactor = Users::Delete.run(user: current_user, password: password)

    if interactor.valid?
      log_out

      {errors: []}
    else
      {errors: interactor.errors.full_messages}
    end
  end
end
