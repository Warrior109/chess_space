# frozen_string_literal: true

# Disconnect social network from user
class Users::Omniauth::DisconnectSocial < ApplicationInteraction
  PROVIDER_TO_UID_NAME = User::OAUTH_PROVIDER_TO_UID_NAME

  object :user, class: User
  symbol :provider

  validates :provider, inclusion: {in: %i[google_oauth2 facebook]}

  def execute
    errors.merge!(user.errors) unless user.update(PROVIDER_TO_UID_NAME.fetch(provider) => nil)
    user
  end
end
