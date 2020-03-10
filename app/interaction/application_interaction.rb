# frozen_string_literal: true

# Base class for all interactions
class ApplicationInteraction < ActiveInteraction::Base
  extend Memoist

  private

  def broadcast(subscription_name, object, **args)
    BroadcastToSubscription.run!(
      subscription_name: subscription_name,
      object: object,
      args: args
    )
  end

  def t(key, **args)
    I18n.t(
      "active_interaction.#{self.class.to_s.underscore.gsub('/', '.')}.#{key}",
      args
    )
  end
end
