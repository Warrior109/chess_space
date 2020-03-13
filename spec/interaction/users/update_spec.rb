# frozen_string_literal: true

RSpec.describe Users::Update do
  let(:interaction) { described_class.run(user: user, **inputs) }
  let(:user) { create(:user, password: '12345678', password_confirmation: '12345678') }
  let(:inputs) { {} }

  describe '#result' do
    subject { interaction.result&.reload }

    let(:inputs) {
      super().merge(
        trainer: true,
        skill_level: 'novice',
        birthday: Date.today,
        lat: 48.976,
        lng: 23.989,
        address: 'Dolyna city',
        goal: 'Make me famous',
        about_me: 'Very special person',
        first_name: 'Test109',
        last_name: 'SuperTest901',
        email: 'test_email@super.com'
      )
    }

    it { is_expected.to have_attributes(**inputs) }

    context 'when not all inputs present' do
      let(:inputs) { {trainer: false} }

      it { is_expected.to have_attributes(**inputs) }
    end

    context 'when password present' do
      let(:inputs) { {password: '12344321', password_confirmation: '12344321'} }

      it { is_expected.to be_valid_password('12344321') }

      context 'when password confirmation incorrect' do
        let(:inputs) { super().merge(password_confirmation: '00') }

        it { is_expected.not_to be_valid_password('12344321') }
      end
    end

    context 'when avatars present' do
      let(:inputs) { {original_avatar: fixture_file_upload('test.svg'), thumbnail_avatar: fixture_file_upload('test.svg')} }

      its(:original_avatar) { is_expected.to be_attached }
      its(:thumbnail_avatar) { is_expected.to be_attached }
    end
  end
end
