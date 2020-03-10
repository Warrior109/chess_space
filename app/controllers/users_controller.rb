# frozen_string_literal: true

# Controller for base user pages
class UsersController < ApplicationController
  before_action :authenticate_user!

  # UsersMyProfile screen
  def my_profile; end
end
