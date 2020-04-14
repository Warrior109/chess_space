# frozen_string_literal: true

RSpec.describe UsersChat, type: :model do
  describe 'associations' do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to belong_to(:chat) }
  end

  describe 'scopes' do
    describe '.most_recent_order' do
      subject { described_class.most_recent_order }

      let!(:chat_with_message1) { create(:chat) }
      let!(:chat_with_message2) { create(:chat) }
      let!(:message2) { create(:message, chat: chat_with_message2) }
      let!(:chats) { create_list(:chat, 5) }
      let!(:message1) { create(:message, chat: chat_with_message1) }

      it {
        is_expected.to eq [
          *chat_with_message1.users_chats.order(created_at: :desc), # latest message
          *chats.reverse.flat_map { |chat| chat.users_chats.order(created_at: :desc) },
          *chat_with_message2.users_chats.order(created_at: :desc) # message was created before chats array
        ]
      }
    end
  end
end
