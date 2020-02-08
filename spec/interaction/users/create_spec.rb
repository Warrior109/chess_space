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
      let(:inputs) {
        {
          first_name: 'Alex',
          last_name: 'Super',
          email: 'super_alex@mail.com',
          password: '1',
          password_confirmation: '1'
        }
      }

      it { is_expected.not_to be_empty }
    end

    context 'when password missmatch' do
      let(:inputs) {
        {
          first_name: 'Alex',
          last_name: 'Super',
          email: 'super_alex@mail.com',
          password: '12345678',
          password_confirmation: '123456789'
        }
      }

      it { is_expected.not_to be_empty }
    end
  end
end
