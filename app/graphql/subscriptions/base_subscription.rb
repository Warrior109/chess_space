# frozen_string_literal: true

# Base class for all subscriptions
class Subscriptions::BaseSubscription < GraphQL::Schema::Subscription
  private

  def current_user
    context[:current_user]
  end
end
