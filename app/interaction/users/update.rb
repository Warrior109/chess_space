# frozen_string_literal: true

# Update user
class Users::Update < ApplicationInteraction
  object :user, class: User

  boolean :trainer, default: nil
  string :skill_level, default: nil
  date :birthday, default: nil
  float :lat, default: nil
  float :lng, default: nil
  string :address, default: nil
  string :goal, default: nil
  string :about_me, default: nil

  file :original_avatar, default: nil
  file :thumbnail_avatar, default: nil

  string :first_name, default: nil
  string :last_name, default: nil
  string :email, default: nil
  string :password, :password_confirmation, default: nil

  string :google_uid, default: nil
  string :facebook_uid, default: nil

  def execute
    user.assign_attributes(user_params)
    compose(Users::AttachAvatar, inputs)
    errors.merge!(user.errors) unless user.save
    user
  end

  private

  def user_params
    inputs.except(:user, :original_avatar, :thumbnail_avatar).compact
  end
end
