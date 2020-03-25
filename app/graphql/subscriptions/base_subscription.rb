# frozen_string_literal: true

# Base class for all subscriptions
class Subscriptions::BaseSubscription < GraphQL::Schema::Subscription
  class << self
    # overriden from ruby graphql gem schema/member/base_dsl_methods.rb
    # Remove only first namespace, which always should be `Subscriptions`
    def default_graphql_name
      @default_graphql_name ||= name.split('::')[1..-1].join
    end
  end

  private

  def current_user
    context[:current_user]
  end
end
