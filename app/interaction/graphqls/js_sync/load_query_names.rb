# frozen_string_literal: true

# TODO: refactoring this system and make correct comments
# .
class Graphqls::JsSync::LoadQueryNames < ApplicationInteraction
  string :data
  string :queries_folder_name

  def execute
    data.match(regexp)[1].split(',').map(&:strip)
  end

  private

  def regexp
    %r{^import\s*\{\s*([a-zA-Z ,\n]*)\s*\}\s*from\s*'\./#{queries_folder_name}';$}m
  end
end
