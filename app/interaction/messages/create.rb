# frozen_string_literal: true

# Create message
class Messages::Create < ApplicationInteraction
  object :sender, class: User

  integer :chat_id, default: nil
  object :chat, class: Chat, default: -> { Chat.find_by(id: chat_id) }

  string :text
  string :uuid # id which generated on frontend to identify messages

  validates :chat, presence: true
  validate :sender_in_chat

  def execute
    message = Message.new(text: text, chat: chat, uuid: uuid)
    build_users_messages(message)
    if message.valid?
      broadcast_changes(message) { message.save }
    else
      errors.merge!(message.errors)
    end
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

  def broadcast_changes(message)
    users_for_broadcast_updates.then { |users|
      yield
      broadcast(:message_was_created, message, chat_id: chat.id)
      broadcast(:chat_was_updated, chat)
      users.each { |user| broadcast(:user_was_updated, user, user_id: user.id) }
    }
  end

  # We should to broadcast user updates only in two cases:
  #   - Recent chat will change (recent chat is not current)
  #   - Appears first unread message in the chat, chat became an unread (user is not sender and
  #     user don't have any unread messages in the chat)
  # NOTE: this method should be executed before message will be saved
  def users_for_broadcast_updates
    chat.users.where.not(id: User.with_recent_chat(chat.id)) \
      | User.readed_chat(chat.id).where.not(id: sender.id)
  end
end
