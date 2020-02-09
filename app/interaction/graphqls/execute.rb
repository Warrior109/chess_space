# frozen_string_literal: true

# Execute graphql queries. Decide according to params should it be Singular or Multiple execution
class Graphqls::Execute < ApplicationInteraction
  object :user, default: nil
  object :controller, class: ApplicationController, default: nil
  object :channel, class: ApplicationCable::Channel, default: nil
  hash :params, strip: false do
    string :query, default: nil
    array :queries, default: nil
  end
  hash :scopes, strip: false, default: {}

  def execute
    if params[:queries]
      compose(Graphqls::MultipleExecute, queries: params[:queries], context: context)
    elsif params[:query]
      compose(Graphqls::SingularExecute, params: params, context: context)
    else
      errors.add(:params, 'query or queries should be provided')
    end
  end

  private

  memoize def context
    {current_user: user, controller: controller, channel: channel}.merge(scopes)
  end
end
