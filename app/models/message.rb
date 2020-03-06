# frozen_string_literal: true

# Representation of message
class Message < ApplicationRecord
  belongs_to :chat
  has_many :users_messages
  has_one :sender_users_message, -> { sender }, class_name: :UsersMessage
  has_one :sender, through: :sender_users_message, source: :user

  validates :text, presence: true
end
