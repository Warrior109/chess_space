# frozen_string_literal: true

# Update user fields only if password is correct
class Users::SecureUpdate < ApplicationInteraction
  object :user, class: User

  string :first_name, default: nil
  string :last_name, default: nil
  string :email, default: nil

  string :password

  def execute
    if user.valid_password?(password)
      compose(Users::Update, inputs.except(:password))
    else
      errors.add(:password, 'incorrect')
    end

    user
  end
end
