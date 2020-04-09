# frozen_string_literal: true

# Batch load count for association or scope
class Loaders::Count < GraphQL::Batch::Loader
  def initialize(model, method_name)
    @model = model
    @method_name = method_name
  end

  def load(record)
    fail TypeError, "#{model} doesn't have a method #{method_name}" unless record.respond_to?(method_name)

    super
  end

  def perform(records)
    records.each { |record| fulfill(record, record.public_send(method_name).count) }
  end

  private

  attr_reader :model, :method_name
end
