# frozen_string_literal: true

class ChessSpaceWebappSchema < GraphQL::Schema
  mutation(Types::MutationType)
  query(Types::QueryType)
  subscription(Types::SubscriptionType)

  # GraphQL::Batch setup:
  use GraphQL::Batch
  use GraphQL::Subscriptions::ActionCableSubscriptions
end
