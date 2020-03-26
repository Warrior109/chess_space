# frozen_string_literal: true

# Base controller
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception, prepend: true

  rescue_from LoadDefaultProps::InvalidQueryError, with: :invalid_query_handler

  private

  def invalid_query_handler(error)
    Rails.logger.error('InvalidQueryError: '.red + error.to_s.light_red)
    redirect_to root_path, alert: I18n.t('error_messages.access_restricted')
  end

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
