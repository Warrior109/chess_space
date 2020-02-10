# frozen_string_literal: true

RSpec.describe Users::Update do
  let(:interaction) { described_class.run(user: user, **inputs) }
  let(:user) { create(:user, password: '12345678', password_confirmation: '12345678') }
  let(:inputs) { {} }

  describe '#result' do
    subject { interaction.result }

    let(:inputs) {
      super().merge(
        trainer: true,
        skill_level: 'test',
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

    its(:reload) { is_expected.to have_attributes(**inputs) }

    context 'when not all inputs present' do
      let(:inputs) { {trainer: false} }

      its(:reload) { is_expected.to have_attributes(**inputs) }
    end

    context 'when password present' do
      let(:inputs) { {password: '12344321', password_confirmation: '12344321'} }

      its(:reload) { is_expected.to be_valid_password('12344321') }

      context 'when password confirmation incorrect' do
        let(:inputs) { super().merge(password_confirmation: '00') }

        its(:reload) { is_expected.not_to be_valid_password('12344321') }
      end
    end
  end
end
