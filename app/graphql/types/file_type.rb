# frozen_string_literal: true

class Types::FileType < Types::BaseScalar
  def self.coerce_input(input_value, _context)
    # Override this to prepare a client-provided GraphQL value for your Ruby code
    input_value
  end

  def self.coerce_result(ruby_value, _context)
    # Override this to serialize a Ruby value for the GraphQL response
    ruby_value.path
  end
end
