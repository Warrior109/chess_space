# frozen_string_literal: true

# Base class for different message subscription
class Subscriptions::Messages::Base < Subscriptions::BaseSubscription
  field :object, Types::MessageType, null: true

  argument :chat_id, Integer, required: true

  def authorized?(chat_id:, **)
    Loaders::Record
      .for(Chat, joins: :users_chats, where: {users_chats: {user_id: current_user.id}})
      .load(chat_id)
      .then(&:present?)
  end

  def update(**)
    object
  end
end
