# frozen_string_literal: true

# Check email uniqueness
class Mutations::Users::EmailUniquenessValidation < Mutations::BaseNoAuthMutation
  field :is_valid, Boolean, null: false

  argument :email, String, required: true

  def resolve(email:)
    {is_valid: Users::EmailUniquenessValidation.run(email: email).result}
  end
end
