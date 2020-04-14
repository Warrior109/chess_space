# frozen_string_literal: true

# Representation of message
class Message < ApplicationRecord
  belongs_to :chat
  has_many :users_messages
  has_one :sender_users_message, -> { sender }, class_name: :UsersMessage
  has_one :sender, through: :sender_users_message, source: :user

  validates :text, presence: true

  scope :unread, ->(user_id) {
    joins(:users_messages)
      .where(users_messages: {read_at: nil, user_id: user_id, role: :receiver})
      .distinct
  }

  scope :latest_order, -> { order(created_at: :desc) } # latest message will be the first
  scope :oldest_order, -> { order(created_at: :asc) } # oldest message will be the first
end
