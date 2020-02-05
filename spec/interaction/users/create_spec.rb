# frozen_string_literal: true

RSpec.describe Users::Create do
  let(:first_name) {}
  let(:last_name) {}
  let(:email) {}
  let(:password) {}
  let(:password_confirmation) {}

  describe '#call' do
    subject { described_class.run!(first_name: first_name, last_name: last_name, email: email, password: password, password_confirmation: password_confirmation) }

    # TODO: write specs
  end
end
