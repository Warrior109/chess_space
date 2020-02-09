# frozen_string_literal: true

# Interaction for create user
class Users::Create < ApplicationInteraction
  string :first_name
  string :last_name
  string :email
  string :password
  string :password_confirmation

  def execute
    user = User.new(inputs)
    errors.merge!(user.errors) unless user.save
    user
  end
end
