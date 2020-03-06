# frozen_string_literal: true

# graphql implementation for Message model
class Types::MessageType < Types::BaseObject
  field :id, Integer, null: false
  field :text, String, null: false
  field :sender, Types::UserType, null: false

  def sender_id
    Loaders::AssociationLoader.for(Message, :sender).load(object)
  end
end
