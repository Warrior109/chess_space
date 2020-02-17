# frozen_string_literal: true

RSpec.describe Users::Delete do
  let(:interaction) { described_class.run(user: user, password: password) }
  let(:user) { create(:user, **props) }
  let(:props) { {password: '12345678', password_confirmation: '12345678'} }
  let(:password) { '' }

  describe '#result' do
    subject { interaction.result }

    context 'when password incorrect' do
      let(:password) { '12344321' }

      its(:deleted_at) { is_expected.to be_nil }
    end

    context 'when password correct' do
      let(:password) { '12345678' }

      its(:deleted_at) { is_expected.to be_present }
    end
  end

  describe '#errors' do
    subject { interaction.errors }

    context 'when password incorrect' do
      let(:password) { '12344321' }

      it { is_expected.to be_present }
    end

    context 'when password correct' do
      let(:password) { '12345678' }

      it { is_expected.to be_empty }
    end
  end
end
