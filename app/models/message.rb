# frozen_string_literal: true

# Representation of message
class Message < ApplicationRecord
  belongs_to :chat
  has_many :users_messages

  validates :text, presence: true
end
