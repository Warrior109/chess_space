# frozen_string_literal: true

RSpec.describe Users::Omniauth::DisconnectSocial do
  let(:interaction) { described_class.run(user: user, provider: provider) }
  let(:user) { create(:user, **user_props) }
  let(:user_props) { {} }
  let(:provider) {}

  describe '#result' do
    subject { interaction.result }

    context 'when provider is google_oauth2' do
      let(:user_props) { {google_uid: 'test-google-uid'} }
      let(:provider) { 'google_oauth2' }

      its_block { is_expected.to change(user, :google_uid).from('test-google-uid').to(nil) }
    end
  end

  describe '#errors' do
    subject { interaction.errors }

    let(:user_props) { {google_uid: 'test-google-uid'} }
    let(:provider) { 'google_oauth2' }

    it { is_expected.to be_empty }

    context 'when provider missed' do
      let(:provider) {}

      it { is_expected.to be_present }
    end

    context 'when provider not valid' do
      let(:provider) { 'twitter' }

      it { is_expected.to be_present }
    end
  end
end
