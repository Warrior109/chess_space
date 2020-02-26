# frozen_string_literal: true

RSpec.describe Users::Create do
  let(:interaction) { described_class.run(**inputs) }
  let(:inputs) { {} }

  describe '#result' do
    subject { interaction.result }

    let(:inputs) {
      {
        first_name: 'Alex',
        last_name: 'Super',
        email: 'super_alex@mail.com',
        password: '12345678',
        password_confirmation: '12345678'
      }
    }

    its(:reload) { is_expected.to have_attributes(**inputs.except(:password, :password_confirmation)) }

    context 'when oauth uid present' do
      let(:inputs) { super().merge(google_uid: 'test-uid') }

      its(:reload) { is_expected.to have_attributes(**inputs.except(:password, :password_confirmation)) }
    end

    context 'when avatars present' do
      let(:inputs) { super().merge(original_avatar: fixture_file_upload('test.svg'), thumbnail_avatar: fixture_file_upload('test.svg')) }

      its(:original_avatar) { is_expected.to be_attached }
      its(:thumbnail_avatar) { is_expected.to be_attached }
    end
  end

  describe '#errors' do
    subject { interaction.errors }

    let(:inputs) {
      {
        first_name: 'Alex',
        last_name: 'Super',
        email: 'super_alex@mail.com',
        password: '12345678',
        password_confirmation: '12345678'
      }
    }

    it { is_expected.to be_empty }

    context 'when password too short' do
      let(:inputs) { super().merge(password: '1', password_confirmation: '1') }

      it { is_expected.to be_present }
    end

    context 'when password missmatch' do
      let(:inputs) { super().merge(password: '12345678', password_confirmation: '123456789') }

      it { is_expected.to be_present }
    end
  end
end
