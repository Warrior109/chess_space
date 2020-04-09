# frozen_string_literal: true

# Base helper
module ApplicationHelper
  def default_props_for_react
    if current_user
      load_default_props(core: :current_user, query: :fetch_current_user, store_key: :object)
      default_props.deep_merge!(current_user: {locale: I18n.locale})
    end
    default_props.merge(toastrData: retrieve_flash_data)
  end

  def should_prerender_on_server?
    !Webpacker.dev_server.running?
  end
end
