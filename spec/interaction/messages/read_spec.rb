# frozen_string_literal: true

RSpec.describe Messages::Read do
  let(:interaction) { described_class.run(ids: messages.pluck(:id), user: user) }
  let(:messages) { create_list(:message, 3, chat: chat) }
  let(:chat) { create(:chat, users: [user, companion]) }
  let(:user) { create(:user) }
  let(:companion) { create(:user) }

  describe '#result' do
    subject { interaction.result }

    it { is_expected.to match_array messages }

    its_block { is_expected.to send_message(BroadcastToSubscription, :run!).with(subscription_name: :message, args: {chat_id: chat.id, action: :update}, object: kind_of(Message)).exactly(3).times }
    its_block { is_expected.to change { UsersMessage.where(user_id: user.id, message_id: messages.pluck(:id)).pluck(:read_at) }.from(Array.new(3, nil)).to(Array.new(3, kind_of(ActiveSupport::TimeWithZone))) }
  end

  describe '#errors' do
    subject { interaction.errors }

    it { is_expected.to be_empty }

    context 'when ids contain message from different chats' do
      let(:messages) { super().push(*messages_from_another_chat) }
      let(:messages_from_another_chat) { create_list(:message, 2) }

      it { is_expected.to be_present }
    end

    context 'when user not from this chat' do
      let(:chat) { create(:chat, users: [create(:user), companion]) }

      it { is_expected.to be_present }
    end
  end
end
