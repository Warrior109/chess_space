# frozen_string_literal: true

FactoryBot.define do
  factory :message do
    transient do
      sender { nil }
    end

    chat
    text { 'MyString' }

    before(:create) do |message, evaluator|
      existing_ids = message.users_messages.map(&:user_id)
      message.chat.users.each do |user|
        next if existing_ids.include?(user.id)

        message.users_messages.build(
          user: user,
          role: evaluator.sender == user ? :sender : :receiver,
          read_at: evaluator.sender == user ? Time.current : nil
        )
      end
    end
  end
end
