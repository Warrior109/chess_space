# frozen_string_literal: true

# Load default props by queries, witch placed in the javascript side.
# So queries should be placed in type:
#   [{core: :current_user, query: :fetch_current_user_skill_level_options}]
class LoadDefaultProps < ApplicationInteraction
  CORE_PATH = Rails.root.join('app/javascript/bundles/core').freeze
  QUERIES_FOLDER_NAME = 'queries'
  GRAPHQL_EXTENSION = '.graphql'

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
    queries.map do |core:, query:, **|
      {
        query: compose(
          ReadFile,
          pathname: CORE_PATH.join(
            core.to_s.camelize(:lower),
            QUERIES_FOLDER_NAME,
            "#{query.to_s.camelize(:lower)}#{GRAPHQL_EXTENSION}"
          )
        )
      }
    end
  end

  def generate_default_props(res)
    default_props = {}
    res.each_with_index do |props, i|
      queries[i].then { |core:, store_key:, **|
        default_props[core] ||= {}
        default_props[core].merge!(store_key => props.to_h.fetch('data').values.first)
      }
    end
    default_props
  end
end
