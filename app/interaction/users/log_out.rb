# frozen_string_literal: true

class Users::LogOut < ActiveInteraction::Base
  object :controller, class: ApplicationController
  object :user
  string :client_id, default: nil

  def execute
    if client_id
      user.tokens.delete(client_id)
      errors.merge!(user.errors) unless user.save
    end
    controller.reset_session
  end
end
