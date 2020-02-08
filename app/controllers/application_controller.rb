# frozen_string_literal: true

# Base controller
class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken

  protect_from_forgery with: :exception, prepend: true

  private

  def current_user
    @current_user ||= super || warden.authenticate(scope: :user)
  rescue StandardError
    nil
  end

  def after_sign_in_path_for(_resource)
    root_path
  end
end
