# frozen_string_literal: true

# Read btach of messages
class Messages::Read < ApplicationInteraction
  array :ids, desc: 'ids of messages which should be readed' do
    integer
  end

  object :user, desc: 'user, who reads messages', class: User

  validate :ids_not_empty
  validate :ids_from_one_chat
  validate :user_have_access_to_chat

  def execute
    Message.transaction {
      user.users_messages
          .includes(message: :chat)
          .where(message_id: ids, read_at: nil) # no need to read already readed messages
          .each(&method(:read_message))
    }.then(&method(:broadcast_changes))
    user.messages.where(id: ids)
  end

  private

  def read_message(user_message)
    user_message.update!(read_at: Time.current)

    broadcast(:message_was_readed, user_message.message, chat_id: user_message.message.chat_id)
  end

  def broadcast_changes(user_messages)
    return if user_messages.empty?

    chat = user_messages.to_a.first.message.chat # all messages from one chat

    broadcast(:chat_was_updated, chat)

    # Broadcast user changes only if chat becames readed
    broadcast(:user_was_updated, user, user_id: user.id) if chat.readed?(user.id)
  end

  def ids_not_empty
    errors.add(:ids, t(:ids_empty)) if ids.empty?
  end

  def ids_from_one_chat
    return unless Chat.joins(:messages).where(messages: {id: ids}).distinct.count > 1

    errors.add(:ids, t(:messages_from_different_chats))
  end

  def user_have_access_to_chat
    return if user.chats.joins(:messages).where(messages: {id: ids}).exists?

    errors.add(:ids, t(:user_not_from_this_chat))
  end
end
