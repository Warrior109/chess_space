# frozen_string_literal: true

# Representation of message
class Message < ApplicationRecord
  belongs_to :chat

  validates :text, presence: true
end
