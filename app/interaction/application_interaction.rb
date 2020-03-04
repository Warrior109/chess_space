# frozen_string_literal: true

# Base class for all interactions
class ApplicationInteraction < ActiveInteraction::Base
  extend Memoist

  private

  def t(key, **args)
    I18n.t(
      "active_interaction.#{self.class.to_s.underscore.gsub('/', '.')}.#{key}",
      args
    )
  end
end
