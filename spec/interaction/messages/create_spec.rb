# frozen_string_literal: true

RSpec.describe Messages::Create do
  let(:interaction) { described_class.run(sender: sender, text: text, chat: chat) }
  let(:sender) { create(:user) }
  let(:text) { '' }
  let(:chat) { create(:chat, users: [sender, receiver]) }
  let(:receiver) { create(:user) }

  describe '#result' do
    subject { interaction.result }

    let(:text) { 'test message text' }

    it { is_expected.to be_persisted }
    it { is_expected.to have_attributes(text: 'test message text', chat_id: chat.id) }

    its_block { is_expected.to change(Message, :count).from(0).to(1) }
    its_block { is_expected.to change(UsersMessage, :count).from(0).to(2) }
    its(:users_messages) {
      is_expected.to match_array [
        have_attributes(role: 'sender', user_id: sender.id, read_at: kind_of(ActiveSupport::TimeWithZone)),
        have_attributes(role: 'receiver', user_id: receiver.id, read_at: nil)
      ]
    }
  end

  describe '#errors' do
    subject { interaction.errors }

    let(:text) { 'test text' }

    it { is_expected.to be_empty }

    context 'when sender not from chat' do
      let(:chat) { create(:chat, users: [sender2, receiver]) }
      let(:sender2) { create(:user) }

      it { is_expected.to be_present }
    end
  end
end
