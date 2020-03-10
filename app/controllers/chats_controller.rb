# frozen_string_literal: true

# Controller for chats
class ChatsController < ApplicationController
  before_action :authenticate_user!

  def show
    @default_props = params.fetch(:id).to_i.then { |id|
      load_default_props(
        {core: :chat, query: :fetch_chat, store_key: :object, variables: {id: id}},
        core: :message, query: :fetch_messages_list, store_key: :list, variables: {chat_id: id}
      )
    }
  end
end
