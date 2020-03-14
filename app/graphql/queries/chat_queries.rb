# frozen_string_literal: true

# Queries for Chat
module Queries::ChatQueries
  extend ActiveSupport::Concern

  included do
    field :chat, Types::ChatType, null: true do
      description 'Returns chat by id'
      argument :id, Integer, required: true

      def visible?(context)
        super && context[:current_user].present?
      end
    end
  end

  def chat(id:)
    Loaders::Record
      .for(Chat, joins: :users_chats, where: {users_chats: {user_id: current_user.id}})
      .load(id)
  rescue ActiveRecord::RecordNotFound
    nil
  end
end
