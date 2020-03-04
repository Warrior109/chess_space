# frozen_string_literal: true

# Interaction for safety destroy user
class Users::Delete < ApplicationInteraction
  object :user, class: User
  string :password

  def execute
    if user.valid_password?(password)
      user.destroy!
    else
      errors.add(:password, t(:incorrect_password))
    end
    user
  end
end
