# frozen_string_literal: true

RSpec.describe Users::AttachAvatar do
  let(:interaction) { described_class.run(**inputs) }
  let(:inputs) { {} }

  describe '#result' do
    subject { interaction.result }

    let(:inputs) {
      {
        user: create(:user),
        original_avatar: fixture_file_upload('test.svg'),
        thumbnail_avatar: file_fixture('test.svg').open
      }
    }

    its(:original_avatar) { is_expected.to be_attached }
    its(:original_avatar) { is_expected.to have_attributes(filename: ActiveStorage::Filename.wrap('test.svg')) }
    its(:thumbnail_avatar) { is_expected.to be_attached }
    its(:thumbnail_avatar) { is_expected.to have_attributes(filename: ActiveStorage::Filename.wrap('test.svg')) }

    context 'when one is missed' do
      let(:inputs) { super().merge(original_avatar: nil) }

      its(:original_avatar) { is_expected.not_to be_attached }
      its(:thumbnail_avatar) { is_expected.to be_attached }
    end
  end

  describe '#errors' do
    subject { interaction.errors }

    let(:inputs) { {user: create(:user)} }

    it { is_expected.to be_empty }

    context 'when user is missed' do
      let(:inputs) { {} }

      it { is_expected.to be_present }
    end
  end
end
