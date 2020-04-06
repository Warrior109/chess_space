# frozen_string_literal: true

# Subscribe onto chats update event.
# Triggers after:
#   - New message was added to chat
class Subscriptions::Chats::WasUpdated < Subscriptions::BaseSubscription
  field :object, Types::ChatType, null: true

  def update(**)
    Loaders::Record
      .for(Chat, joins: :users_chats, where: {users_chats: {user_id: current_user.id}})
      .load(object.id)
      .then(&:present?)
      .then { |is_present| is_present ? object : :no_update }
  end
end
