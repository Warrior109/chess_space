# frozen_string_literal: true

FactoryBot.define do
  factory :message do
    transient do
      sender { nil }
    end

    chat
    text { 'MyString' }

    before(:create) do |message, evaluator|
      message.chat.users.each do |user|
        message.users_messages.build(
          user: user,
          role: evaluator.sender == user ? :sender : :receiver
        )
      end
    end
  end
end
