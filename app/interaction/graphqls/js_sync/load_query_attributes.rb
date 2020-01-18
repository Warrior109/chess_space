# frozen_string_literal: true

class Graphqls::JsSync::LoadQueryAttributes < ActiveInteraction::Base
  JS_GRAPHQL_REQUEST_FUNC_NAME = 'graphQLRequest'

  string :data
  string :js_action_name

  def execute
    data.match(regexp)[1]
  end

  private

  def regexp
    /#{js_action_name}[^\n]+#{JS_GRAPHQL_REQUEST_FUNC_NAME}\(\s*(\{[^()]*\})\s*\)/m
  end
end
