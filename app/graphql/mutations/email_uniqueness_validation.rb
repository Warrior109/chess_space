# frozen_string_literal: true

class Mutations::EmailUniquenessValidation < Mutations::BaseNoAuthMutation
  field :is_valid, Boolean, null: false

  argument :email, String, required: true

  def resolve(email:)
    {is_valid: Users::EmailUniquenessValidation.run(email: email).result}
  end
end
