# frozen_string_literal: true

RSpec.describe Users::EmailUniquenessValidation do
  let(:email) {}

  describe '#call' do
    subject { described_class.run!(email: email) }

    context 'when email is uniqueness' do
      let(:email) { 'uniq_email@mail.com' }

      it { is_expected.to be true }
    end

    context 'when email is not uniqueness' do
      let(:email) { 'not_uniq_email@mail.com' }
      let!(:user) { create(:user, email: email) }

      it { is_expected.to be false }
    end
  end
end
