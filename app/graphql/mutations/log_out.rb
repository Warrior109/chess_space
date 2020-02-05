# frozen_string_literal: true

# log out user from the system
class Mutations::LogOut < Mutations::BaseAuthMutation
  field :errors, [String], null: false

  def resolve(client_id: nil)
    log_out
    {errors: []}
  end
end
