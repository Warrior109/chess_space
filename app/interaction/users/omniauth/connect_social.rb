# frozen_string_literal: true

# Connect social network to user
class Users::Omniauth::ConnectSocial < ApplicationInteraction
  PROVIDER_TO_UID_NAME = User::OAUTH_PROVIDER_TO_UID_NAME

  object :user, class: User
  object :auth, class: OmniAuth::AuthHash

  validate :social_not_connected_yet

  def execute
    compose(Users::Update, user: user, uid_name => auth.uid)
  end

  private

  def social_not_connected_yet
    errors.add(auth.provider, 'already connected') if user.attributes.fetch(uid_name.to_s).present?
  end

  memoize def uid_name
    PROVIDER_TO_UID_NAME.fetch(auth.provider.to_sym)
  end
end
