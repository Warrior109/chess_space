# frozen_string_literal: true

# Send to user email reset password instructions
class Users::SendResetPasswordInstructions < ApplicationInteraction
  string :email

  def execute
    user = User.send_reset_password_instructions(inputs)
    errors.merge!(user.errors) if user.errors.present?
    user
  end
end
