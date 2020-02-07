# frozen_string_literal: true

# Update user
class Users::Update < ActiveInteraction::Base
  object :user, class: User

  boolean :trainer, default: nil
  string :skill_level, default: nil
  date :birthday, default: nil
  float :lat, default: nil
  float :lng, default: nil
  string :address, default: nil
  string :goal, default: nil
  string :about_me, default: nil

  def execute
    errors.merge!(user.errors) unless user.update(user_params)
    user
  end

  private

  def user_params
    inputs.except(:user).compact
  end
end