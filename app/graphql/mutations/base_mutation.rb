# frozen_string_literal: true

# base class for all mutations
class Mutations::BaseMutation < GraphQL::Schema::RelayClassicMutation
  private

  def controller
    context.fetch(:controller)
  end
end
