# frozen_string_literal: true

# TODO: refactoring this system and make correct comments
# .
class Graphqls::JsSync::CreateTransformGraphqlToReduxKeysHash < ApplicationInteraction
  hash :queries, strip: false

  def execute
    queries.each_with_object({}) do |(query_name, query), hash|
      graphql_key = retrieve_graphql_key(query)
      hash[graphql_key] = query_name
    end
  end

  private

  def retrieve_graphql_key(query)
    query.match(/(query|mutation|subscription)\s(\w+)(\([^{}]+\))?\s*\{/m)[2]
  end
end
