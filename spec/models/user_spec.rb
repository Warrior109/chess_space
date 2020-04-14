# frozen_string_literal: true

RSpec.describe User, type: :model do
  describe 'associations' do
    it { is_expected.to have_many(:users_chats) }
    it { is_expected.to have_many(:chats).through(:users_chats) }
    it { is_expected.to have_many(:sorted_chats).through(:users_chats).class_name(Chat) }
    it { is_expected.to have_many(:unread_chats).through(:users_chats).class_name(Chat) }
    it { is_expected.to have_one(:recent_users_chat).class_name(UsersChat) }
    it { is_expected.to have_one(:recent_chat).through(:recent_users_chat).class_name(Chat) }
    it { is_expected.to have_many(:users_messages) }
    it { is_expected.to have_many(:messages).through(:users_messages) }
    it { is_expected.to have_many(:unread_messages).through(:users_messages).class_name(Message) }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:first_name) }
    it { is_expected.to validate_presence_of(:last_name) }
    it { is_expected.to validate_presence_of(:email) }
    it { is_expected.to validate_uniqueness_of(:email).ignoring_case_sensitivity }
    it { is_expected.to validate_uniqueness_of(:google_uid).allow_nil }
    it { is_expected.to validate_uniqueness_of(:facebook_uid).allow_nil }
  end

  describe 'scopes' do
    describe '.readed_chat' do
      subject { described_class.readed_chat(chat.id) }

      let(:users) { create_list(:user, 3) }
      let(:chat) { create(:chat, users: users) }
      let!(:message) { create(:message, chat: chat, sender: users.first) }

      before { Messages::Read.run!(user: users.second, ids: [message.id]) }

      # Chat has only one message.
      # First user - sender, so message was readed for him
      # Second user - receiver, but in before block we read this message for him
      # Third user - not read the message
      it { is_expected.to eq [users.first, users.second] }
    end

    describe '.with_recent_chat' do
      subject { described_class.with_recent_chat(recent_chat.id) }

      let(:users) { create_list(:user, 3) }
      let!(:chat1) { create(:chat, users: [users.first]) }
      let!(:chat2) { create(:chat, users: users) }
      let!(:recent_chat) { create(:chat, users: users) }
      let!(:chat3) { create(:chat, users: [users.second]) }
      let!(:message1) { create(:message, chat: chat1) }

      # Recent chats should be:
      #   - First user - chat1, which was created before the recent chat, but received message
      #     after the recent chat was created
      #   - Second user - have the chat3, which was created after the recent chat
      it { is_expected.to eq [users.third] }
    end
  end

  describe '#image_path_for' do
    subject { user.image_path_for(user.original_avatar) }

    let(:user) { build(:user, **props) }
    let(:props) { {} }

    before { stub_const('User::DEFAULT_ATTACHMENT_PATHS', original_avatar: 'test/test.png') }

    it { is_expected.to eq 'test/test.png' }

    context 'when avatar present' do
      let(:props) { {original_avatar: fixture_file_upload('test.svg')} }

      it { is_expected.to match 'rails/active_storage/blobs' }
    end
  end
end
