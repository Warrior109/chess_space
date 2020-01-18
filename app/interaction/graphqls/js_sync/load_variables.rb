# frozen_string_literal: true

class Graphqls::JsSync::LoadVariables < ActiveInteraction::Base
  array :variables, default: []
  string :attrs

  def execute
    attrs_dup = attrs.dup
    index = 0
    attrs.scan(/variables[^\n]*$/m) do |vars|
      attrs_dup.sub!(vars, "variables: #{variables[index]}")
      index += 1
    end
    attrs_dup
  end
end
