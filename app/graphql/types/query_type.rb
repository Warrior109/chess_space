# frozen_string_literal: true

# Base class to include all queries for user
class Types::QueryType < Types::BaseObject
  include Queries::UserQueries
end
