# frozen_string_literal: true

# Base helper
module ApplicationHelper
  def default_props_for_react
    user_props =
      if current_user
        {
          current_user: {
            object: current_user.as_json,
            locale: I18n.locale
          }
        }
      else
        {}
      end
    user_props.deep_merge(@default_props || {}) # rubocop:disable Rails/HelperInstanceVariable
              .merge(toastrData: retrieve_flash_data)
  end

  def should_prerender_on_server?
    !Webpacker.dev_server.running?
  end
end
