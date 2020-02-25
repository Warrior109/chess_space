# frozen_string_literal: true

# Class to define all mutations
class Types::MutationType < Types::BaseObject
  # Users mutations
  field :email_uniqueness_validation, mutation: Mutations::Users::EmailUniquenessValidation
  field :sign_up, mutation: Mutations::Users::SignUp
  field :log_out, mutation: Mutations::Users::LogOut
  field :sign_in, mutation: Mutations::Users::SignIn
  field :user_update, mutation: Mutations::Users::Update
  field :user_secure_update, mutation: Mutations::Users::SecureUpdate
  field :current_user_delete, mutation: Mutations::Users::Delete
  field :current_user_forgot_password, mutation: Mutations::Users::ForgotPassword
  field :current_user_forgot_password_update, mutation: Mutations::Users::ForgotPasswordUpdate
end
