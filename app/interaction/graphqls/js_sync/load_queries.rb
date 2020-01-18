# frozen_string_literal: true

class Graphqls::JsSync::LoadQueries < ActiveInteraction::Base
  GRAPHQL_EXTENSION = 'graphql'

  object :queries_folder_path, class: Pathname
  array :query_names

  def execute
    query_names.each_with_object({}) do |query_name, hash|
      hash[query_name] = compose(
        ReadFile,
        pathname: queries_folder_path.join("#{query_name}.#{GRAPHQL_EXTENSION}")
      )
    end
  end
end
