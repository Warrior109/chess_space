# frozen_string_literal: true

FactoryBot.define do
  factory :users_message do
    user
    message
    read_at { nil }
    deleted_at { nil }
    role { UsersMessage.role.values.sample }
  end
end
