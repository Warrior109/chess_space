# frozen_string_literal: true

FactoryBot.define do
  factory :users_message do
    user { nil }
    message { nil }
    read_at { '2020-03-05 08:49:11' }
    deleted_at { '2020-03-05 08:49:11' }
    role { 'MyString' }
  end
end
