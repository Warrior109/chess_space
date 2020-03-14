# frozen_string_literal: true

# Join table with user and message. Also store role for this user, receiver or sender
class UsersMessage < ApplicationRecord
  extend Enumerize

  belongs_to :user
  belongs_to :message

  enumerize :role, in: %i[receiver sender]

  validates :role, presence: true
  validates :message_id, uniqueness: {scope: :user_id}

  scope :sender, -> { where(role: :sender) }
  scope :receivers, -> { where(role: :receiver) }
end
