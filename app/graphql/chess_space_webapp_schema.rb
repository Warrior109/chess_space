# frozen_string_literal: true

# Graphql schema for App
class ChessSpaceWebappSchema < GraphQL::Schema
  mutation Types::MutationType
  # query Types::QueryType
  # subscription Types::SubscriptionType

  # GraphQL::Batch setup:
  use GraphQL::Batch
  use GraphQL::Subscriptions::ActionCableSubscriptions
end
