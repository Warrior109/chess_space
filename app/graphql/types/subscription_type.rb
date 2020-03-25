# frozen_string_literal: true

# Base type for subscriptions
class Types::SubscriptionType < Types::BaseObject
  extend GraphQL::Subscriptions::SubscriptionRoot

  # Messages
  field :message_was_created, subscription: Subscriptions::Messages::WasCreated
  field :message_was_readed, subscription: Subscriptions::Messages::WasReaded
end
