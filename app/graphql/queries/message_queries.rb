# frozen_string_literal: true

# Queries for Message
module Queries::MessageQueries
  extend ActiveSupport::Concern

  included do
    field :messages, Types::MessageType.connection_type, null: true do
      description 'Returns messages for chat'
      argument :chat_id, Integer, required: true

      def visible?(context)
        super && context[:current_user].present?
      end
    end
  end

  def messages(chat_id:)
    Loaders::Record
      .for(Chat, joins: :users_chats, where: {users_chats: {user_id: current_user.id}})
      .load(chat_id)
      .then(&Loaders::AssociationLoader.for(Chat, :messages).method(:load))
  end
end
