# frozen_string_literal: true

# Queries for Chat
module Queries::ChatQueries
  extend ActiveSupport::Concern

  included do
    field :chat, Types::ChatType, null: false do
      description 'Returns chat by id'
      argument :id, Integer, required: true

      def visible?(context)
        super && context[:current_user].present?
      end
    end

    field :chats, Types::ChatType.connection_type, null: false do
      description 'Returns chats for current_user'

      def visible?(context)
        super && context[:current_user].present?
      end
    end
  end

  def chat(id:)
    Loaders::Record
      .for(Chat, joins: :users_chats, where: {users_chats: {user_id: current_user.id}})
      .load(id)
  end

  def chats
    Loaders::AssociationLoader.for(User, :sorted_chats).load(current_user)
  end
end
