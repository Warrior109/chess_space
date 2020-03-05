# frozen_string_literal: true

# Join table between user and chat
class UsersChat < ApplicationRecord
  belongs_to :user
  belongs_to :chat
end
