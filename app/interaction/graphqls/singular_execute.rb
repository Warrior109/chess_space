# frozen_string_literal: true

# Executes singular graphql queries
class Graphqls::SingularExecute < ApplicationInteraction
  hash :context, strip: false do
    object :current_user, class: User, default: nil
    object :controller, class: ApplicationController, default: nil
    object :channel, class: ApplicationCable::Channel, default: nil
  end
  hash :params, strip: false do
    string :query, default: nil
    object :variables, class: Object
  end

  def execute
    ChessSpaceWebappSchema.execute(params[:query], variables: retrieve_variables, context: context)
  end

  private

  def retrieve_variables
    variables = parse_variables(params.fetch(:variables, nil))
    files = compose(Graphqls::RetrieveVariablesFromMultipartParams, inputs)
    variables.deep_merge!(files) if files
    variables
  end

  def parse_variables(variables)
    case variables.presence
    when String
      JSON.parse(variables)
    when Hash, ActionController::Parameters
      variables
    when nil
      {}
    else
      errors.add(:unexpected_variables, variables.to_s)
    end
  end
end
