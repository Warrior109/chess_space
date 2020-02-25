# frozen_string_literal: true

RSpec.describe Users::SendResetPasswordInstructions do
  let(:interaction) { described_class.run(**inputs) }
  let(:inputs) { {} }

  describe '#result' do
    subject { interaction.result }

    let!(:user) { create(:user, email: 'testemail@mail.com') }

    context 'when email is exists' do
      let(:inputs) { {email: 'testemail@mail.com'} }

      it { is_expected.to eq user }
    end

    context 'when email not exists' do
      let(:inputs) { {email: 'not_real@mail.com'} }

      its(:persisted?) { is_expected.to be false }
    end

    context 'when email not provided' do
      let(:inputs) { {} }

      it { is_expected.to be_nil }
    end
  end

  describe '#errors' do
    subject { interaction.errors }

    let!(:user) { create(:user, email: 'testemail@mail.com') }

    context 'when email is exists' do
      let(:inputs) { {email: 'testemail@mail.com'} }

      it { is_expected.to be_empty }
    end

    context 'when email not exists' do
      let(:inputs) { {email: 'not_real@mail.com'} }

      it { is_expected.to be_present }
    end

    context 'when email not provided' do
      let(:inputs) { {} }

      it { is_expected.to be_present }
    end
  end
end
