# frozen_string_literal: true

class Mutations::BaseMutation < GraphQL::Schema::RelayClassicMutation
  private

  def controller
    context.fetch(:controller)
  end
end
