# frozen_string_literal: true

# Base type for subscriptions
class Types::SubscriptionType < Types::BaseObject
  extend GraphQL::Subscriptions::SubscriptionRoot

  # Messages
  field :message_was_created, subscription: Subscriptions::Messages::WasCreated
  field :message_was_readed, subscription: Subscriptions::Messages::WasReaded

  # Chats
  field :chat_was_updated, subscription: Subscriptions::Chats::WasUpdated

  # Uers
  field :user_was_updated, subscription: Subscriptions::Users::WasUpdated
end
