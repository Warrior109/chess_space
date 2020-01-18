# frozen_string_literal: true

class Graphqls::Execute < ActiveInteraction::Base
  object :user, default: nil
  object :controller, class: ApplicationController, default: nil
  object :channel, class: ApplicationCable::Channel, default: nil
  hash :params, strip: false do
    string :query, default: nil
    array :queries, default: nil
  end
  hash :scopes, strip: false, default: {}

  def execute
    context = { current_user: user, controller: controller, channel: channel }.merge(scopes)
    if params[:queries]
      compose(Graphqls::MultipleExecute, queries: params[:queries], context: context)
    elsif params[:query]
      compose(Graphqls::SingularExecute, params: params, context: context)
    else
      errors.add(:params, 'query or queries should be provided')
    end
  end
end
