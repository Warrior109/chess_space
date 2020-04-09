# frozen_string_literal: true

# Join table between user and chat
class UsersChat < ApplicationRecord
  belongs_to :user
  belongs_to :chat

  scope :most_recent_order, -> {
    select(<<~SQL)
      users_chats.*,
      GREATEST(MAX(messages.created_at), MAX(chats.created_at)) AS most_recent_messages
    SQL
      .joins(:chat)
      .joins('LEFT JOIN messages ON messages.chat_id = chats.id')
      .order('most_recent_messages DESC')
      .group('users_chats.id')
  }
end
