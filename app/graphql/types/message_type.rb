# frozen_string_literal: true

# graphql implementation for Message model
class Types::MessageType < Types::BaseObject
  field :id, Integer, null: false
  field :text, String, null: false
  field :sender, Types::UserType, null: false
  field :status, String, null: false
  field :uuid, String, null: false

  def sender_id
    Loaders::AssociationLoader.for(Message, :sender).load(object)
  end

  # TODO: after add read_at system apply logic for readed
  def status
    :saved
  end
end
