# frozen_string_literal: true

# Implement websocket channel for graphql
class GraphqlChannel < ApplicationCable::Channel
  def subscribed
    @subscription_ids = []
  end

  def execute(data)
    result = Graphqls::Execute.run!(
      params: data.except(:scopes),
      user: current_user,
      channel: self,
      scopes: data[:scopes]
    )

    payload = {
      result: result.subscription? ? {data: nil} : result.to_h,
      more: result.subscription?
    }

    @subscription_ids << result.context[:subscription_id] if result.context[:subscription_id]
    transmit(payload)
  end

  def unsubscribed
    @subscription_ids.each do |sid|
      ChessSpaceWebappSchema.subscriptions.delete_subscription(sid)
    end
  end
end
