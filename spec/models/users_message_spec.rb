# frozen_string_literal: true

RSpec.describe UsersMessage, type: :model do
  describe 'associations' do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to belong_to(:message) }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:role) }
    it { is_expected.to validate_inclusion_of(:role).in_array(%i[receiver sender]) }
  end

  describe 'scopes' do
    describe '.senders' do
      subject { described_class.senders }

      let!(:receivers) { create(:users_message, role: :receiver) }
      let!(:senders) { create(:users_message, role: :sender) }

      it { is_expected.to match_array senders }
    end

    describe '.receivers' do
      subject { described_class.receivers }

      let!(:receivers) { create(:users_message, role: :receiver) }
      let!(:senders) { create(:users_message, role: :sender) }

      # should be more, factories automatically creates it with role receiver for all users in chat
      it { is_expected.to include receivers }
    end
  end
end
