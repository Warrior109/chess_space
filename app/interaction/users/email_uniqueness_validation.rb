# frozen_string_literal: true

# Check if email is uniqueness
class Users::EmailUniquenessValidation < ActiveInteraction::Base
  string :email

  def execute
    !User.where(email: email).exists?
  end
end
