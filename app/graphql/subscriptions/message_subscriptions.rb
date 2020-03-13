# frozen_string_literal: true

# Subscriptions for message
module Subscriptions::MessageSubscriptions
  extend ActiveSupport::Concern

  included do
    field :message, Types::MessageType, null: false, description: 'Sends new messages' do
      argument :chat_id, Integer, required: true
    end
  end

  def message(chat_id:)
    fail GraphQL::ExecutionError, "Can't subscribe to this chat: #{chat_id}" \
      unless current_user.chats.where(id: chat_id).exists?

    object
  end
end
