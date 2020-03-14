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
          .where(message_id: ids)
          .each { |um| um.update!(read_at: Time.current) }
      user.messages.where(id: ids)
    end
  end

  private

  def ids_from_one_chat
    return unless Chat.joins(:messages).where(messages: {id: ids}).count > 1

    errors.add(:ids, t(:messages_from_different_chats))
  end

  def user_have_access_to_chat
    return unless user.chats.joins(:messages).where(messages: {id: ids}).exists?

    errors.add(:ids, t(:user_not_from_this_chat))
  end
end
