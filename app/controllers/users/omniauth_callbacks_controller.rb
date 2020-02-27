# frozen_string_literal: true

# Controller which provides callbacks for omniauth
class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  before_action :set_callback_type
  before_action :set_auth

  CALLBACK_TYPE_TO_INTERACTION = {
    signup: Users::Omniauth::SignUp,
    signin: Users::Omniauth::Find,
    connect: Users::Omniauth::ConnectSocial
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
    interactor = CALLBACK_TYPE_TO_INTERACTION.fetch(callback_type).run(
      auth: auth, user: warden.user
    )

    if interactor.valid?
      on_success(interactor.result)
    else
      flash[:alert] = interactor.errors.full_messages.to_sentence
      on_error
    end
  end

  def on_success(user)
    case callback_type
    when :connect
      flash[:notice] = I18n.t(
        'user.success_messages.social_connected',
        social: User::OAUTH_PROVIDER_TO_SOCIAL.fetch(auth.provider.to_sym)
      )
      redirect_to contacts_users_edit_path
    else
      sign_in_and_redirect user
    end
  end

  def on_error
    case callback_type
    when :connect
      redirect_to contacts_users_edit_path
    else
      redirect_to root_path
    end
  end
end
