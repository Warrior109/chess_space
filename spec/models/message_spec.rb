# frozen_string_literal: true

RSpec.describe Message, type: :model do
  describe 'associations' do
    it { is_expected.to belong_to(:chat) }
    it { is_expected.to have_many(:users_messages) }
    it { is_expected.to have_one(:sender_users_message).conditions(role: :sender).class_name(UsersMessage) }
    it { is_expected.to have_one(:sender).class_name(User).through(:sender_users_message) }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:text) }
  end

  describe 'scopes' do
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
        Messages::Read.run!(user: user, ids: [message2_2.id])
      }

      # Messages: 1_1 and 2_1 was readed, because user is sender
      # Messages: 1_2 and 2_2 was readed manually in before block
      # Messages: 3_1, 3_2 and 3_3 belongs to chat, which not related to user
      it { is_expected.to match_array [message1_3, message2_3] }
    end

    describe '.latest_order' do
      subject { described_class.latest_order }

      let!(:messages) { create_list(:message, 4) }

      it { is_expected.to eq messages.reverse }
    end

    describe '.oldest_order' do
      subject { described_class.oldest_order }

      let!(:messages) { create_list(:message, 4) }

      it { is_expected.to eq messages }
    end
  end
end
