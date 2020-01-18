# frozen_string_literal: true

class Users::SignInWeb < ActiveInteraction::Base
  object :controller, class: ApplicationController

  def execute
    controller.allow_params_authentication!
    user = controller.warden.authenticate(scope: :user)
    if user
      controller.sign_in(:user, user)
    else
      error_key = controller.warden.winning_strategy.message
      errors.add(:attempt_fails!, I18n.t("devise.failure.#{error_key}", authentication_keys: :email))
    end
    user
  end
end
