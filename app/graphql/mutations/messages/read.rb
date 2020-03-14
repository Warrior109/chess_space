# frozen_string_literal: true

# Read batch of messages
class Mutations::Messages::Read < Mutations::BaseAuthMutation
  field :messages, [Types::MessageType], null: true
  field :errors, [String], null: false

  argument :ids, [Integer], required: true

  def resolve(ids:)
    interactor = Messages::Read.run(ids: ids, user: current_user)

    if interactor.valid?
      {
        messages: interactor.result,
        errors: []
      }
    else
      {
        messages: nil,
        errors: retrieve_errors(interactor)
      }
    end
  end
end
