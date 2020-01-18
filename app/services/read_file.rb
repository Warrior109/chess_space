# frozen_string_literal: true

class ReadFile < ActiveInteraction::Base
  object :pathname

  def execute
    File.read(pathname)
  rescue StandardError => e
    errors.add(:file_read_error, e.message)
  end
end
