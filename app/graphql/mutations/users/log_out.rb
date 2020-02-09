# frozen_string_literal: true

# log out user from the system
class Mutations::Users::LogOut < Mutations::BaseAuthMutation
  field :errors, [String], null: false

  def resolve
    log_out
    {errors: []}
  end
end
