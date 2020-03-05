# frozen_string_literal: true

# Create chat with users
class Chats::Create < ApplicationInteraction
  array :users do
    object class: User
  end

  validate :minimum_2_users
  validate :same_users

  def execute
    chat = Chat.new(users: users)
    errors.merge!(chat.errors) unless chat.save
    chat
  end

  private

  def minimum_2_users
    errors.add(:users, t(:minimum_2_users)) if users.count < 2
  end

  def same_users
    errors.add(:users, t(:same_users)) unless users.uniq.count == users.count
  end
end
