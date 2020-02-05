# frozen_string_literal: true

class Types::MutationType < Types::BaseObject
  field :email_uniqueness_validation, mutation: Mutations::EmailUniquenessValidation
  field :sign_up, mutation: Mutations::SignUp
  field :log_out, mutation: Mutations::LogOut
end
