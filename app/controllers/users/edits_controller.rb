# frozen_string_literal: true

# controller for edit pages
class Users::EditsController < ApplicationController
  # UsersEditCommon screen
  def common
    @default_props = load_default_props(
      core: :current_user,
      query: :fetch_current_user_skill_level_options,
      store_key: :skill_level_options
    )
  end

  # UsersEditContacts screen
  def contacts; end

  # UsersEditSecurity screen
  def security; end
end
