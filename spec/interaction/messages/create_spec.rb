# frozen_string_literal: true

RSpec.describe Messages::Create do
  let(:interaction) { described_class.run(**inputs) }
  let(:inputs) { {sender: sender, text: text, chat: chat, uuid: uuid} }
  let(:uuid) { SecureRandom.uuid }
  let(:sender) { create(:user) }
  let(:text) { '' }
  let(:chat) { create(:chat, users: [sender, receiver]) }
  let(:receiver) { create(:user) }

  describe '#result' do
    subject { interaction.result }

    let(:text) { 'test message text' }

    it { is_expected.to be_persisted }
    it { is_expected.to have_attributes(text: 'test message text', chat_id: chat.id) }

    its_block { is_expected.to send_message(BroadcastToSubscription, :run!).with(subscription_name: :message_was_created, args: {chat_id: chat.id}, object: kind_of(Message)) }
    its_block { is_expected.to send_message(BroadcastToSubscription, :run!).with(subscription_name: :chat_was_updated, args: {}, object: chat) }
    its_block { is_expected.to change(Message, :count).from(0).to(1) }
    its_block { is_expected.to change(UsersMessage, :count).from(0).to(2) }
    its(:users_messages) {
      is_expected.to match_array [
        have_attributes(role: 'sender', user_id: sender.id, read_at: kind_of(ActiveSupport::TimeWithZone)),
        have_attributes(role: 'receiver', user_id: receiver.id, read_at: nil)
      ]
    }

    context 'when chat missed and chat_id present' do
      let(:inputs) { super().except(:chat).merge(chat_id: chat.id) }

      it { is_expected.to be_persisted }
      it { is_expected.to have_attributes(text: 'test message text', chat_id: chat.id) }

      its_block { is_expected.to send_message(BroadcastToSubscription, :run!).with(subscription_name: :message_was_created, args: {chat_id: chat.id}, object: kind_of(Message)) }
      its_block { is_expected.to send_message(BroadcastToSubscription, :run!).with(subscription_name: :chat_was_updated, args: {}, object: chat) }
      its_block { is_expected.to change(Message, :count).from(0).to(1) }
      its_block { is_expected.to change(UsersMessage, :count).from(0).to(2) }
      its(:users_messages) {
        is_expected.to match_array [
          have_attributes(role: 'sender', user_id: sender.id, read_at: kind_of(ActiveSupport::TimeWithZone)),
          have_attributes(role: 'receiver', user_id: receiver.id, read_at: nil)
        ]
      }
    end

    context 'when sender have another recent chat' do
      let(:another_chat) { create(:chat, users: [sender]) }

      before {
        chat
        another_chat # creates another chat after chat
      }

      its_block { is_expected.to send_message(BroadcastToSubscription, :run!).with(subscription_name: :user_was_updated, args: {user_id: sender.id}, object: sender) }
    end

    context 'when chat already readed' do
      let!(:message) { create(:message, chat: chat, sender: sender) }

      before { Messages::Read.run!(user: receiver, ids: [message.id]) }

      its_block {
        is_expected.to send_message(BroadcastToSubscription, :run!).with(subscription_name: :user_was_updated, args: {user_id: receiver.id}, object: receiver)
          .and dont.send_message(BroadcastToSubscription, :run!).with(subscription_name: :user_was_updated, args: {user_id: sender.id}, object: sender)
      }
    end

    context 'when chat recent and not readed' do
      let!(:message) { create(:message, chat: chat) }

      its_block {
        is_expected.not_to send_message(BroadcastToSubscription, :run!).with(subscription_name: :user_was_updated, args: {user_id: kind_of(Integer)}, object: kind_of(User))
      }
    end
  end

  describe '#errors' do
    subject { interaction.errors }

    let(:text) { 'test text' }

    it { is_expected.to be_empty }

    context 'when sender not from the chat' do
      let(:chat) { create(:chat, users: [sender2, receiver]) }
      let(:sender2) { create(:user) }

      it { is_expected.to be_present }
    end

    context 'when chat missed and chat_id present' do
      let(:inputs) { super().except(:chat).merge(chat_id: chat.id) }

      it { is_expected.to be_empty }

      context 'when chat with chat_id does not exists' do
        let(:inputs) { super().merge(chat_id: 0) }

        it { is_expected.to be_present }
      end
    end
  end
end
