# frozen_string_literal: true

RSpec.describe Users::SecureUpdate do
  let(:interaction) { described_class.run(user: user, **inputs) }
  let(:user) { create(:user, password: '12345678', password_confirmation: '12345678') }
  let(:inputs) { {} }

  describe '#result' do
    subject { interaction.result }

    let(:inputs) {
      super().merge(
        first_name: 'Alex109',
        last_name: 'Hosh109',
        password: '12345678'
      )
    }

    its(:reload) { is_expected.to have_attributes(**inputs.except(:password)) }

    context 'when incorrect password' do
      let(:inputs) { super().merge(password: '00') }

      its(:reload) { is_expected.not_to have_attributes(**inputs.except(:password)) }
    end

    context 'when email instead of name' do
      let(:inputs) { {email: 'test@mail109.com', password: '12345678'} }

      its(:reload) { is_expected.to have_attributes(**inputs.except(:password)) }
    end
  end

  describe '#errors' do
    subject { interaction.errors }

    let(:inputs) {
      super().merge(
        first_name: 'Alex109',
        last_name: 'Hosh109',
        password: '12345678'
      )
    }

    it { is_expected.to be_empty }

    context 'when incorrect password' do
      let(:inputs) { super().merge(password: '00') }

      it { is_expected.not_to be_empty }
    end
  end
end
