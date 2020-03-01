# frozen_string_literal: true

# Base type for select options
class Types::SelectOptionsType < Types::BaseObject
  field :label, String, null: true
  field :value, String, null: true
end
