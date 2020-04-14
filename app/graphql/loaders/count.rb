# frozen_string_literal: true

# Batch load count for association or scope
class Loaders::Count < GraphQL::Batch::Loader
  def initialize(model, *scopes)
    @model = model
    @scopes = scopes # scopes or associations
  end

  def perform(records)
    records.each { |record| fulfill(record, query(record).count) }
  end

  private

  attr_reader :model, :scopes

  def query(record)
    scopes.reduce(record) { |rec, name:, args: []| rec.public_send(name, *args) }
  end
end
