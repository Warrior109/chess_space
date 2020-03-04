# frozen_string_literal: true

# Connect social network to user
class Users::Omniauth::ConnectSocial < ApplicationInteraction
  PROVIDER_TO_UID_NAME = User::OAUTH_PROVIDER_TO_UID_NAME
  PROVIDER_TO_SOCIAL = User::OAUTH_PROVIDER_TO_SOCIAL

  object :user, class: User
  object :auth, class: OmniAuth::AuthHash

  validate :social_not_connected_yet

  def execute
    compose(Users::Update, user: user, uid_name => auth.uid)
  end

  private

  def social_not_connected_yet
    return if user.attributes.fetch(uid_name.to_s).blank?

    errors.add(:oauth, t(:already_conected, social: PROVIDER_TO_SOCIAL.fetch(auth.provider.to_sym)))
  end

  memoize def uid_name
    PROVIDER_TO_UID_NAME.fetch(auth.provider.to_sym)
  end
end
