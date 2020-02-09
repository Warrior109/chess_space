# frozen_string_literal: true

# Interaction to read file
class ReadFile < ApplicationInteraction
  object :pathname

  def execute
    File.read(pathname)
  rescue StandardError => e
    errors.add(:file_read_error, e.message)
  end
end
