# frozen_string_literal: true

# Read btach of messages
class Messages::Read < ApplicationInteraction
  array :ids, desc: 'ids of messages which should be readed' do
    integer
  end

  object :user, desc: 'user, who reads messages', class: User

  validate :ids_from_one_chat
  validate :user_have_access_to_chat

  def execute
    Message.transaction do
      user.users_messages
          .includes(:message)
          .where(message_id: ids, read_at: nil) # no need to read already readed messages
          .each(&method(:read_message))
          .each(&method(:broadcast_message))
      user.messages.where(id: ids)
    end
  end

  private

  def read_message(user_message)
    user_message.update!(read_at: Time.current)
  end

  def broadcast_message(user_message)
    broadcast(
      :message_channel,
      user_message.message,
      chat_id: user_message.message.chat_id
    )
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
