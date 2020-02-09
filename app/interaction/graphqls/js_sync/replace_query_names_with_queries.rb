# frozen_string_literal: true

# TODO: refactoring this system and make correct comments
# .
class Graphqls::JsSync::ReplaceQueryNamesWithQueries < ApplicationInteraction
  hash :queries, strip: false
  string :attributes

  def execute
    queries.each_with_object(attributes.dup) do |(query_name, query), obj|
      obj.gsub!(query_name, "'#{query}'")
    end
  end
end
