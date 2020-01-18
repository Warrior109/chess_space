# frozen_string_literal: true

class Graphqls::MultipleExecute < ActiveInteraction::Base
  hash :context, strip: false do
    object :current_user, class: User, default: nil
    object :controller, class: ApplicationController, default: nil
    object :channel, class: ApplicationCable::Channel, default: nil
  end

  array :queries

  def execute
    queries_with_context = queries.map do |qr|
      {
        query: qr[:query],
        variables: qr[:variables],
        context: context
      }
    end

    ChessSpaceWebappSchema.multiplex(queries_with_context)
  end
end
