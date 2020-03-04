# frozen_string_literal: true

# Create user from omniauth
class Users::Omniauth::SignUp < ApplicationInteraction
  class UserEmailExistsError < StandardError; end
  class UserExistsError < StandardError; end

  object :auth, class: OmniAuth::AuthHash

  def execute
    send("#{auth.provider}_attributes")
      .tap(&method(:validate!))
      .then { |attrs| compose(Users::Create, attrs) }
  rescue UserExistsError
    errors.add(:user, t(:already_exists))
    nil
  rescue UserEmailExistsError
    errors.add(:user, t(:email_already_exists))
    nil
  end

  private

  # Check if user already exists. We could not to create two same users
  def validate!(email:, **extra)
    (find_oauth_user(**extra) and fail UserExistsError) \
      || (User.find_by(email: email) and fail UserEmailExistsError)
  end

  def find_oauth_user(google_uid: nil, facebook_uid: nil, **)
    User.find_by({google_uid: google_uid, facebook_uid: facebook_uid}.compact)
  end

  def google_oauth2_attributes # rubocop:disable Metrics/AbcSize
    {
      email: auth.info.email,
      first_name: auth.info.first_name,
      last_name: auth.info.last_name,
      original_avatar: auth.info.image.presence&.then(&URI.method(:open)),
      thumbnail_avatar: auth.extra.id_info.picture.presence&.then(&URI.method(:open)),
      google_uid: auth.uid,
      **password_attributes
    }
  end

  def facebook_attributes # rubocop:disable Metrics/AbcSize
    {
      email: auth.info.email,
      first_name: auth.info.first_name,
      last_name: auth.info.last_name,
      original_avatar: auth.info.image.presence&.then(&URI.method(:open)),
      thumbnail_avatar: auth.extra.raw_info.picture.data.url.presence&.then(&URI.method(:open)),
      facebook_uid: auth.uid,
      **password_attributes
    }
  end

  def password_attributes
    SecureRandom.uuid.then { |password| {password: password, password_confirmation: password} }
  end
end
