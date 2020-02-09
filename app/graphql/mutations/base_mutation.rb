# frozen_string_literal: true

# base class for all mutations
class Mutations::BaseMutation < GraphQL::Schema::RelayClassicMutation
  class << self
    # overriden from ruby graphql gem schema/member/base_dsl_methods.rb
    # Remove only first namespace, which always should be `Mutations`
    def default_graphql_name
      @default_graphql_name ||= name.split('::')[1..-1].join
    end
  end

  private

  def controller
    context.fetch(:controller)
  end
end
