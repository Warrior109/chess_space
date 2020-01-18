# frozen_string_literal: true

class Users::SignInApi < ActiveInteraction::Base
  string :email
  string :password
  object :controller, class: ApplicationController

  def execute
    user = compose(Users::GetUserForSignIn, email: email)
    compose(Users::CheckPassword, user: user, password: password)

    client_id, token = user.create_token
    if user.save
      controller.sign_in(:user, user)
    else
      errors.merge!(user.errors)
    end
    [user, client_id, token]
  end
end
