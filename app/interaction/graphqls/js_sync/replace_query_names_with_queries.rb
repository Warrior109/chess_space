# frozen_string_literal: true

class Graphqls::JsSync::ReplaceQueryNamesWithQueries < ActiveInteraction::Base
  hash :queries, strip: false
  string :attributes

  def execute
    queries.each_with_object(attributes.dup) do |(query_name, query), obj|
      obj.gsub!(query_name, "'#{query}'")
    end
  end
end
