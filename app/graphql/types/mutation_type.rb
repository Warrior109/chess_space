# frozen_string_literal: true

class Types::MutationType < Types::BaseObject
  field :email_uniqueness_validation, mutation: Mutations::EmailUniquenessValidation
end
