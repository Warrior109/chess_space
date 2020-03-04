# frozen_string_literal: true

# Update user fields only if password is correct
class Users::SecureUpdate < ApplicationInteraction
  INPUTS_TRANSFORM_KEYS = {
    new_password: :password,
    new_password_confirmation: :password_confirmation
  }.freeze

  object :user, class: User

  string :first_name, :last_name, default: nil
  string :email, default: nil
  string :new_password, :new_password_confirmation, default: nil

  string :password

  def execute
    if user.valid_password?(password)
      compose(Users::Update, update_params)
    else
      errors.add(:password, t(:incorrect_password))
    end

    user
  end

  private

  def update_params
    inputs.except(:password)
          .transform_keys { |k, _| INPUTS_TRANSFORM_KEYS.fetch(k, k) }
  end
end
