# frozen_string_literal: true

# Update reseted password
class Users::ResetPassword < ApplicationInteraction
  string :password
  string :password_confirmation
  string :reset_password_token

  def execute
    user = User.reset_password_by_token(inputs)
    errors.merge!(user.errors) if user.errors.present?
    user
  end
end
