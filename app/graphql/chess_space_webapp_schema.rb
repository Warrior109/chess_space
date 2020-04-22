# frozen_string_literal: true

# Graphql schema for App
class ChessSpaceWebappSchema < GraphQL::Schema
  mutation Types::MutationType
  query Types::QueryType
  subscription Types::SubscriptionType

  # GraphQL::Batch setup:
  use GraphQL::Batch

  use GraphQL::Subscriptions::ActionCableSubscriptions
  use GraphQL::Execution::Interpreter
  use GraphQL::Analysis::AST
  use GraphQL::Pagination::Connections

  # Connections
  connections.add(Message.const_get(:GeneratedRelationMethods), Connections::MessagesConnection)
end
