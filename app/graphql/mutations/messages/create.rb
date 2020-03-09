# frozen_string_literal: true

# Create message
class Mutations::Messages::Create < Mutations::BaseAuthMutation
  field :message, Types::MessageType, null: true
  field :errors, [String], null: false

  argument :text, String, required: true
  argument :chat_id, Integer, required: true

  def resolve(text:, chat_id:)
    interactor = Messages::Create.run(
      sender: current_user,
      chat_id: chat_id,
      text: text
    )

    if interactor.valid?
      {
        message: interactor.result,
        errors: []
      }
    else
      {
        message: nil,
        errors: retrieve_errors(interactor)
      }
    end
  end
end
