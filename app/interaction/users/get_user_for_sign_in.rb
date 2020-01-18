# frozen_string_literal: true

class Users::GetUserForSignIn < ActiveInteraction::Base
  string :email

  def execute
    user = User.find_by_email(email)
    user
  end
end
