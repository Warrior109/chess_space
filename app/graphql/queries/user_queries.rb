# frozen_string_literal: true

# Queries for user
module Queries::UserQueries
  extend ActiveSupport::Concern

  included do
    field :user_skill_level_options, [Types::SelectOptionsType], null: false do
      description 'Retrieve all available options for skill_level'
    end
  end

  def user_skill_level_options
    User.skill_level.options.map { |label, value| {label: label, value: value} }
  end
end
