# frozen_string_literal: true

# Controller for chats
class ChatsController < ApplicationController
  before_action :authenticate_user!

  def show
    params.fetch(:id).to_i.then { |id|
      load_default_props(
        {core: :chat, query: :fetch_chat, store_key: :object, variables: {id: id}},
        {
          core: :chat,
          query: :fetch_chats,
          transform_to_store: {
            nodes: {keys: :list},
            %i[page_info end_cursor] => {keys: :cursors, func: ->(val) { Array(val) }},
            %i[page_info has_next_page] => {keys: :has_more_pages}
          },
          variables: {id: id}
        },
        core: :message,
        query: :fetch_messages_list,
        transform_to_store: {
          nodes: {keys: :list},
          %i[page_info start_cursor] => {keys: :cursors, func: ->(val) { Array(val) }},
          %i[page_info has_previous_page] => {keys: :has_more_pages}
        },
        variables: {chat_id: id}
      )
    }
  end
end
