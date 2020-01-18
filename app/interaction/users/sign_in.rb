# frozen_string_literal: true

class Users::SignIn < ActiveInteraction::Base
  string :email, default: nil
  string :password, default: nil
  string :type
  object :controller, class: ApplicationController

  validates_inclusion_of :type, in: %w[web api]

  def execute
    compose("Users::SignIn#{type.camelize}".constantize, inputs)
  end
end
