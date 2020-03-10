# frozen_string_literal: true

# Base controller
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception, prepend: true

  private

  def load_default_props(*queries)
    LoadDefaultProps.run!(queries: queries, user: current_user, controller: self)
  end

  def current_user
    @current_user ||= super || warden.authenticate(scope: :user)
  rescue StandardError
    nil
  end

  def after_sign_in_path_for(_resource)
    root_path
  end
end
