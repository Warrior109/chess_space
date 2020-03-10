# frozen_string_literal: true

# Base type for subscriptions
class Types::SubscriptionType < GraphQL::Schema::Object
  include Subscriptions::MessageSubscriptions

  private

  def current_user
    context[:current_user]
  end
end
