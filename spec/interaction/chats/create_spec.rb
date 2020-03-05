# frozen_string_literal: true

RSpec.describe Chats::Create do
  let(:interaction) { described_class.run(users: users) }
  let(:users) { [] }

  describe '#result' do
    subject { interaction.result }

    let(:users) { [user1, user2] }
    let(:user1) { create(:user) }
    let(:user2) { create(:user) }

    it { is_expected.to be_persisted }

    its_block { is_expected.to change(Chat, :count).from(0).to(1) }
    its_block { is_expected.to change(UsersChat, :count).from(0).to(2) }
  end

  describe '#errors' do
    subject { interaction.errors }

    let(:users) { [user1, user2] }
    let(:user1) { create(:user) }
    let(:user2) { create(:user) }

    it { is_expected.to be_empty }

    context 'when users is less than 2' do
      let(:users) { [user1] }

      it { is_expected.to be_present }
    end

    context 'when chat with one user' do
      let(:users) { [user1, user1] }

      it { is_expected.to be_present }
    end
  end
end
