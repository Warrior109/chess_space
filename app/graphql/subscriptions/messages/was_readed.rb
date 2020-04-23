# frozen_string_literal: true

# Subscription for send readed messages
class Subscriptions::Messages::WasReaded < Subscriptions::BaseSubscription
  field :ids, [Integer], null: true

  argument :chat_id, Integer, required: true

  def authorized?(chat_id:, **)
    Loaders::Record
      .for(Chat, joins: :users_chats, where: {users_chats: {user_id: current_user.id}})
      .load(chat_id)
      .then(&:present?)
  end

  def update(**)
    {ids: object}
  end
end
