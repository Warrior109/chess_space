# frozen_string_literal: true

RSpec.describe Users::Omniauth::SignUp do
  let(:interaction) { described_class.run(auth: OmniAuth::AuthHash.new(auth)) }

  let(:auth) {}

  before {
    allow(URI).to receive(:open).with('test_image').and_return(fixture_file_upload('test.svg'))
    allow(URI).to receive(:open).with('test_thumbnail_image').and_return(fixture_file_upload('test.svg'))
  }

  describe 'google_oauth2 provider' do
    let(:auth) {
      {
        provider: 'google_oauth2',
        uid: 'test-google-uid',
        info: {
          email: 'test10@mail.com',
          first_name: 'Alex',
          last_name: 'Test',
          image: 'test_image'
        },
        extra: {id_info: {picture: 'test_thumbnail_image'}}
      }
    }

    describe '#result' do
      subject { interaction.result }

      it { is_expected.to be_persisted }
      its(:original_avatar) { is_expected.to be_attached }
      its(:thumbnail_avatar) { is_expected.to be_attached }

      it {
        is_expected.to have_attributes(
          email: 'test10@mail.com',
          first_name: 'Alex',
          last_name: 'Test',
          google_uid: 'test-google-uid'
        )
      }

      context 'when avatar is empty' do
        let(:auth) { super().merge(extra: {id_info: {picture: ''}}) }

        its(:thumbnail_avatar) { is_expected.not_to be_attached }
      end

      context 'when user with uid already exists' do
        let!(:user) { create(:user, google_uid: 'test-google-uid') }

        it { is_expected.to be_nil }
      end

      context 'when user with email already exists' do
        let!(:user) { create(:user, email: 'test10@mail.com') }

        it { is_expected.to be_nil }
      end
    end

    describe '#errors' do
      subject { interaction.errors }

      it { is_expected.to be_empty }

      context 'when user with uid already exists' do
        let!(:user) { create(:user, google_uid: 'test-google-uid') }

        it { is_expected.to be_present }
      end

      context 'when user with email already exists' do
        let!(:user) { create(:user, email: 'test10@mail.com') }

        it { is_expected.to be_present }
      end
    end
  end
end
