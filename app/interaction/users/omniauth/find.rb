# frozen_string_literal: true

# Find user by omniauth params
class Users::Omniauth::Find < ApplicationInteraction
  PROVIDER_TO_UID_NAME = User::OAUTH_PROVIDER_TO_UID_NAME

  object :auth, class: OmniAuth::AuthHash

  def execute
    user = User.find_by(PROVIDER_TO_UID_NAME.fetch(auth.provider.to_sym) => auth.uid)
    errors.add(:user, t(:user_not_found)) unless user
    user
  end
end
