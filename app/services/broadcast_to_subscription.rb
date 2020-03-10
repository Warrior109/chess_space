# frozen_string_literal: true

# Broadcasts messages to subscription
class BroadcastToSubscription < ApplicationInteraction
  symbol :subscription_name
  hash :args, default: {}, strip: false
  object :object, class: Object

  def execute
    ChessSpaceWebappSchema.subscriptions.trigger(
      subscription_name.to_s.camelize(:lower),
      args,
      object
    )
  end
end
