# frozen_string_literal: true

# Subscribe onto user update event.
# Triggers after:
#   - Unread chats count was changed
#   - Changed recent chat
class Subscriptions::Users::WasUpdated < Subscriptions::BaseSubscription
  field :item, Types::UserType, null: true

  argument :user_id, Integer, required: true

  def authorized?(user_id:, **)
    user_id == current_user.id
  end

  def update(**)
    {item: object}
  end
end
