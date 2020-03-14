# frozen_string_literal: true

# Batch load record for Graphql queries
class Loaders::Record < GraphQL::Batch::Loader
  def initialize(model, column: model.primary_key, joins: nil, where: nil)
    @model = model
    @column = column.to_s
    @column_type = model.type_for_attribute(column)
    @joins = joins
    @where = where
  end

  def load(key)
    super(column_type.cast(key))
  end

  def perform(keys)
    query(keys).each { |record| fulfill(record.public_send(column), record) }
    keys.each { |key| fulfill(key, nil) unless fulfilled?(key) }
  end

  private

  attr_reader :model, :column, :column_type, :joins, :where

  def query(keys)
    scope = model
    scope = scope.joins(joins) if joins
    scope = scope.where(where) if where
    scope.where(column => keys)
  end
end
