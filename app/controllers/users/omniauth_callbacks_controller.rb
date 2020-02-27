# frozen_string_literal: true

# Controller which provides callbacks for omniauth
class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  before_action :set_callback_type
  before_action :set_auth

  CALLBACK_TYPE_TO_INTERACTION = {
    signup: Users::Omniauth::SignUp,
    signin: Users::Omniauth::Find
  }.freeze

  def google_oauth2
    autorize
  end

  def failure
    redirect_to root_path
  end

  private

  attr_reader :callback_type, :auth

  def set_callback_type
    @callback_type = request.env['omniauth.params'].fetch('type').to_sym
  end

  def set_auth
    @auth = request.env['omniauth.auth']
  end

  def autorize
    interactor = CALLBACK_TYPE_TO_INTERACTION.fetch(callback_type).run(auth: auth)
    if interactor.valid?
      sign_in_and_redirect interactor.result
    else
      flash[:alert] = interactor.errors.full_messages.to_sentence
      redirect_to root_path
    end
  end
end
