# frozen_string_literal: true

# Create message
class Messages::Create < ApplicationInteraction
  object :sender, class: User

  integer :chat_id, default: nil
  object :chat, class: Chat, default: -> { Chat.find_by(id: chat_id) }

  string :text

  validates :chat, presence: true
  validate :sender_in_chat

  def execute
    message = Message.new(text: text, chat: chat)
    build_users_messages(message)
    errors.merge!(message.errors) unless message.save
    message
  end

  private

  def sender_in_chat
    errors.add(:sender, t(:sender_not_in_chat)) unless chat&.users&.include?(sender)
  end

  def build_users_messages(message)
    message.users_messages.build(user: sender, role: :sender, read_at: Time.current)
    chat.users
        .where.not(id: sender.id)
        .each { |user| message.users_messages.build(user: user, role: :receiver) }
  end
end
