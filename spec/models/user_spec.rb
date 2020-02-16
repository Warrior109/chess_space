# frozen_string_literal: true

RSpec.describe User, type: :model do
  let(:user) { create(:user, **props) }
  let(:props) { {} }

  describe 'image_path_for' do
    subject { user.image_path_for(user.original_avatar) }

    before { stub_const('User::DEFAULT_ATTACHMENT_PATHS', original_avatar: 'test/test.png') }

    it { is_expected.to eq 'test/test.png' }

    context 'when avatar present' do
      let(:props) { {original_avatar: fixture_file_upload('test.svg')} }

      it { is_expected.to match 'rails/active_storage/blobs' }
    end
  end
end
