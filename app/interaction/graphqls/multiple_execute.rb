# frozen_string_literal: true

# Executes multiple requests in graphql
class Graphqls::MultipleExecute < ApplicationInteraction
  hash :context, strip: false do
    object :current_user, class: User, default: nil
    object :controller, class: ApplicationController, default: nil
    object :channel, class: ApplicationCable::Channel, default: nil
  end

  array :queries

  def execute
    queries_with_context = queries.map { |qr|
      {
        query: qr[:query],
        variables: qr[:variables],
        context: context
      }
    }

    ChessSpaceWebappSchema.multiplex(queries_with_context)
  end
end
