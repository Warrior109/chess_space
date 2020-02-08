# frozen_string_literal: true

# Base class for all mutations which requires user authentication
class Mutations::BaseAuthMutation < Mutations::BaseMutation
  def self.visible?(context)
    super && context[:current_user].present?
  end

  private

  def current_user
    context.fetch(:current_user)
  end

  def log_out
    controller.reset_session
  end
end
