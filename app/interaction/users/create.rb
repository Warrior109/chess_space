# frozen_string_literal: true

# Interaction for create user
class Users::Create < ApplicationInteraction
  string :first_name
  string :last_name
  string :email
  string :password
  string :password_confirmation

  file :original_avatar, default: nil
  file :thumbnail_avatar, default: nil

  string :google_uid, default: nil
  string :facebook_uid, default: nil

  def execute
    user = User.new(inputs.except(:original_avatar, :thumbnail_avatar).compact)
    compose(Users::AttachAvatar, user: user, **inputs)
    errors.merge!(user.errors) unless user.save
    user
  end
end
