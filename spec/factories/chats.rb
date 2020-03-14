# frozen_string_literal: true

FactoryBot.define do
  factory :chat do
    before(:create) do |chat|
      # NOTE: `length` - to work with array, not association
      chat.users = create_list(:user, 2 - chat.users.length) if chat.users.length < 2
    end
  end
end
