# frozen_string_literal: true

FactoryBot.define do
  factory :message do
    chat { nil }
    text { 'MyString' }
  end
end
