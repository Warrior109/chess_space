# frozen_string_literal: true

RSpec.describe Chat, type: :model do
  describe 'associations' do
    it { is_expected.to have_many(:users_chats) }
    it { is_expected.to have_many(:users).through(:users_chats) }
    it { is_expected.to have_many(:messages).order(created_at: :asc) }
    it { is_expected.to have_one(:last_message).class_name(Message).order(created_at: :desc) }
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
          chat_with_message1, # latest message
          *chats.reverse,
          chat_with_message2 # message was created before chats array
        ]
      }
    end

    describe '.unread' do
      subject { described_class.unread(user.id) }

      let(:user) { create(:user) }
      let!(:chat1) { create(:chat, users: [user]) }
      let!(:chat2) { create(:chat, users: [user]) }
      let!(:chat3) { create(:chat) }
      let!(:message1_1) { create(:message, chat: chat1, sender: user) }
      let!(:message1_2) { create(:message, chat: chat1) }
      let!(:message1_3) { create(:message, chat: chat1) }
      let!(:message2_1) { create(:message, chat: chat2, sender: user) }
      let!(:message2_2) { create(:message, chat: chat2) }
      let!(:message2_3) { create(:message, chat: chat2) }
      let!(:message3_1) { create(:message, chat: chat3) }
      let!(:message3_2) { create(:message, chat: chat3) }
      let!(:message3_3) { create(:message, chat: chat3) }

      before {
        Messages::Read.run!(user: user, ids: [message1_2.id])
        Messages::Read.run!(user: user, ids: [message2_2.id, message2_3.id])
      }

      # Messages: 1_1 user is sender, 1_2 readed manually, but message 1_3 not read,
      #           so chat1 is unread
      # Messages: 2_1 user is sender, 2_2 and 2_3 was readed manually in before block,
      #           so chat2 is readed
      # Messages: 3_1, 3_2 and 3_3 belongs to chat, which not related to user, so chat3 should not
      #           be in the result
      it { is_expected.to match_array [chat1] }
    end
  end
end
