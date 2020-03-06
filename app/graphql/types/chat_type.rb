# frozen_string_literal: true

# graphql implementation for Chat model
class Types::ChatType < Types::BaseObject
  field :id, Integer, null: false
  field :messages, [Types::MessageType], null: false

  def messages
    Loaders::AssociationLoader.for(Chat, :messages).load(object)
  end
end
