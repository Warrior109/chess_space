# frozen_string_literal: true

# Load default props by queries, witch placed in the javascript side.
# So queries should be placed in type:
#   [{core: :current_user, query: :fetch_current_user_skill_level_options}]
class LoadDefaultProps < ApplicationInteraction
  CORE_PATH = Rails.root.join('app/javascript/bundles/core').freeze
  QUERIES_FOLDER_NAME = 'queries'
  GRAPHQL_EXTENSION = '.graphql'

  class InvalidQueryError < StandardError; end

  array :queries
  object :user, class: User
  object :controller, class: ApplicationController

  def execute
    compose(
      Graphqls::Execute,
      params: {queries: generate_queries}, user: user, controller: controller
    ).then(&method(:generate_default_props))
  end

  private

  def generate_queries
    queries.map do |core:, query:, variables:, **|
      {
        query: read_graphql_query(core: core, query: query),
        variables: variables.deep_transform_keys { |key| key.to_s.camelize(:lower) }
      }
    end
  end

  def generate_default_props(res)
    default_props = {}
    res.map(&:to_h).each_with_index do |props, i|
      queries[i].then { |core:, store_key:, **|
        default_props[core] ||= {}
        fail InvalidQueryError, props.fetch('errors') if props.key?('errors')

        default_props[core].merge!(store_key => props.fetch('data').values.first)
      }
    end
    default_props
  end

  def read_graphql_query(core:, query:)
    CORE_PATH
      .join(
        core.to_s.camelize(:lower),
        QUERIES_FOLDER_NAME,
        "#{query.to_s.camelize(:lower)}#{GRAPHQL_EXTENSION}"
      )
      .then { |query_path| [compose(ReadFile, pathname: query_path), query_path.dirname] }
      .then { |q, dir_path| load_fragments(q, dir_path) }
  end

  def load_fragments(query, dir_path)
    result = query
    query.scan(/(^#import\s"(.+\.graphql)"$)/).each do |line, file_path|
      result.gsub!(line, compose(ReadFile, pathname: dir_path.join(file_path)))
    end
    result
  end
end
