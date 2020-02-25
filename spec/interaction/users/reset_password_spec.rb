# frozen_string_literal: true

RSpec.describe Users::ResetPassword do
  let(:interaction) { described_class.run(**inputs) }
  let(:inputs) { {password: '12345678', password_confirmation: '12345678'} }

  describe '#result' do
    subject { interaction.result }

    let!(:user) {
      create(
        :user,
        reset_password_token: Devise.token_generator.digest(User, :reset_password_token, 'test_token'),
        reset_password_sent_at: Time.current
      )
    }

    context 'when token is correct' do
      let(:inputs) { super().merge(reset_password_token: 'test_token') }

      it { is_expected.to eq user }
    end

    context 'when token is wrong' do
      let(:inputs) { super().merge(reset_password_token: 'not_real_token') }

      its(:persisted?) { is_expected.to be false }
    end

    context 'when token is not provided' do
      it { is_expected.to be_nil }
    end
  end

  describe '#errors' do
    subject { interaction.errors }

    let!(:user) {
      create(
        :user,
        reset_password_token: Devise.token_generator.digest(User, :reset_password_token, 'test_token'),
        reset_password_sent_at: Time.current
      )
    }

    context 'when token is correct' do
      let(:inputs) { super().merge(reset_password_token: 'test_token') }

      it { is_expected.to be_empty }
    end

    context 'when token is wrong' do
      let(:inputs) { super().merge(reset_password_token: 'not_real_token') }

      it { is_expected.to be_present }
    end

    context 'when token is not provided' do
      it { is_expected.to be_present }
    end
  end
end
