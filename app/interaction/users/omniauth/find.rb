# frozen_string_literal: true

# Find user by omniauth params
class Users::Omniauth::Find < ApplicationInteraction
  PROVIDER_TO_UID_NAME = {
    google_oauth2: :google_uid
  }.freeze

  object :auth, class: OmniAuth::AuthHash

  def execute
    user = User.find_by(PROVIDER_TO_UID_NAME.fetch(auth.provider.to_sym) => auth.uid)
    errors.add(:user, 'not found.') unless user
    user
  end
end
