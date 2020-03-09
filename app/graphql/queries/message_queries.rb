# frozen_string_literal: true

# Queries for Message
module Queries::MessageQueries
  extend ActiveSupport::Concern

  included do
    field :messages, [Types::MessageType], null: true do
      description 'Returns messages for chat'
      argument :chat_id, Integer, required: true

      def visible?(context)
        super && context[:current_user].present?
      end
    end
  end

  def messages(chat_id:)
    Loaders::AssociationLoader.for(Chat, :messages).load(current_user.chats.find(chat_id))
  rescue ActiveRecord::RecordNotFound
    nil
  end
end
