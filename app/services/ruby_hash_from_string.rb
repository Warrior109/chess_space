# frozen_string_literal: true

# Converts string to ruby hash
# For now useing only to converting internal js files.
#
# WARNING: Should not be used to converts data from client. NEVER!!!!
class RubyHashFromString < ApplicationInteraction
  string :string

  def execute
    eval(string) # rubocop:disable Security/Eval
  rescue Exception => e # rubocop:disable Lint/RescueException
    raise e if Rails.env.development?

    Rails.logger.error(e.message)
    {}
  end
end
