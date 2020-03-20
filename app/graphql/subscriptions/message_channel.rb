# frozen_string_literal: true

# Subscriptions for message
class Subscriptions::MessageChannel < Subscriptions::BaseSubscription
  field :message, Types::MessageType, null: true
  field :action, String, null: true

  argument :chat_id, Integer, required: true
  argument :action, String, required: false

  def authorized?(chat_id:, **)
    Loaders::Record
      .for(Chat, joins: :users_chats, where: {users_chats: {user_id: current_user.id}})
      .load(chat_id)
      .then(&:present?)
  end

  def update(action: :update, **)
    binding.pry
    {message: object, action: action}
  end
end
