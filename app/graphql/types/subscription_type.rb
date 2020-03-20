# frozen_string_literal: true

# Base type for subscriptions
class Types::SubscriptionType < Types::BaseObject
  extend GraphQL::Subscriptions::SubscriptionRoot

  field :message_channel, subscription: Subscriptions::MessageChannel
end
