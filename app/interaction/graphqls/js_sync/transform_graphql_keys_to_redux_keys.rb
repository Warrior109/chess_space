# frozen_string_literal: true

class Graphqls::JsSync::TransformGraphqlKeysToReduxKeys < ActiveInteraction::Base
  array :data
  hash :transform_hash, strip: false

  def execute
    data.each_with_object({}) do |element, hash|
      key = element['data'].keys.first
      hash[transform_hash[key]] = element['data'][key]
    end
  end
end
