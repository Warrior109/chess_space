# frozen_string_literal: true

# controller for edit pages
class Users::EditsController < ApplicationController
  before_action :authenticate_user!

  # UsersEditCommon screen
  def common
    load_default_props(
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
