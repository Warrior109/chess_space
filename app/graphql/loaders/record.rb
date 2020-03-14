# frozen_string_literal: true

# Batch load record for Graphql queries
class Loaders::Record < GraphQL::Batch::Loader
  def initialize(model, column: model.primary_key, joins: nil, where: nil, where_not: nil)
    @model = model
    @column = column.to_s
    @column_type = model.type_for_attribute(column)
    @joins = joins
    @where = where
    @where_not = where_not
  end

  def load(key)
    super(column_type.cast(key))
  end

  def perform(keys)
    query(keys).each { |record| fulfill(record.public_send(column), record) }
    keys.each { |key| fulfill(key, nil) unless fulfilled?(key) }
  end

  private

  attr_reader :model, :column, :column_type, :joins, :where, :where_not

  def query(keys)
    scope = model
    scope = scope.joins(joins) if joins
    scope = scope.where(where) if where
    scope = scope.where.not(where_not) if where_not
    scope.where(column => keys)
  end
end
