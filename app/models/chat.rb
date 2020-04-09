# frozen_string_literal: true

# Representation of chat
class Chat < ApplicationRecord
  has_many :users_chats
  has_many :users, through: :users_chats
  has_many :messages, -> { order(created_at: :asc) }
  has_one :last_message, -> { order(created_at: :desc) }, class_name: :Message

  scope :most_recent_order, -> {
    select('chats.*, GREATEST(MAX(messages.created_at), chats.created_at) AS most_recent_messages')
      .joins('LEFT JOIN messages ON messages.chat_id = chats.id')
      .order('most_recent_messages DESC')
      .group('chats.id')
  }

  scope :unread, ->(user_id) {
    joins(messages: :users_messages)
      .where(users_messages: {read_at: nil, user_id: user_id, role: :receiver})
      .distinct
  }
end
