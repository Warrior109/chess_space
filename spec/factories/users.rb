# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    sequence(:email) { |n| "email#{n}@mail.com" }
    password { '1234567890' }
    password_confirmation { '1234567890' }
  end
end
