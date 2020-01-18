# frozen_string_literal: true

class RubyHashFromString < ActiveInteraction::Base
  string :string

  def execute # rubocop:disable Security/Eval, Lint/RescueException
    eval(string)
  rescue Exception => e
    raise e if Rails.env.development?

    Rails.logger.error(e.message)
    {}
  end
end
