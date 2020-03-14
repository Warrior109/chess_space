# frozen_string_literal: true

# Base class for objects
class Types::BaseObject < GraphQL::Schema::Object
  private

  def current_user
    context[:current_user]
  end
end
