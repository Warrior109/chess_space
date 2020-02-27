# frozen_string_literal: true

RSpec.describe Users::Omniauth::Find do
  let(:interaction) { described_class.run(auth: OmniAuth::AuthHash.new(auth)) }
  let(:auth) { {} }

  describe 'google_oauth2 provider' do
    let(:auth) { {provider: 'google_oauth2', uid: 'test-google-uid'} }
    let!(:user) { create(:user, google_uid: 'test-google-uid') }

    describe '#result' do
      subject { interaction.result }

      it { is_expected.to eq user }

      context 'when user does not exists' do
        let(:auth) { super().merge(uid: 'not-existing-google-uid') }

        it { is_expected.to be_nil }
      end
    end

    describe '#errors' do
      subject { interaction.errors }

      it { is_expected.to be_empty }

      context 'when user does not exists' do
        let(:auth) { super().merge(uid: 'not-existing-google-uid') }

        it { is_expected.to be_present }
      end
    end
  end
end
