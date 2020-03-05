# frozen_string_literal: true

# Representation of chat
class Chat < ApplicationRecord
  has_many :users_chats
  has_many :users, through: :users_chats
  has_many :messages
end
