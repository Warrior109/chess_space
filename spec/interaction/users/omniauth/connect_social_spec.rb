# frozen_string_literal: true

RSpec.describe Users::Omniauth::ConnectSocial do
  let(:interaction) { described_class.run(user: user, auth: OmniAuth::AuthHash.new(auth)) }
  let(:user) { create(:user, **user_props) }
  let(:user_props) { {} }
  let(:auth) { {} }

  describe '#result' do
    subject { interaction.result }

    context 'when provider is google_oauth2' do
      let(:auth) { {provider: 'google_oauth2', uid: 'test-google-uid'} }

      its_block { is_expected.to change(user, :google_uid).from(nil).to('test-google-uid') }
    end
  end

  describe '#errors' do
    subject { interaction.errors }

    context 'when provider is google_oauth2' do
      let(:auth) { {provider: 'google_oauth2', uid: 'test-google-uid'} }

      it { is_expected.to be_empty }

      context 'when social already connected' do
        let(:user_props) { {google_uid: 'some-uid'} }

        it { is_expected.to be_present }
      end
    end
  end
end
