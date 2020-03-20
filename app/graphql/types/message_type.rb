# frozen_string_literal: true

# graphql implementation for Message model
class Types::MessageType < Types::BaseObject
  field :id, Integer, null: false
  field :text, String, null: false
  field :sender, Types::UserType, null: false
  field :status, String, null: false
  field :uuid, String, null: false

  def sender
    Loaders::AssociationLoader.for(Message, :sender).load(object)
  end

  def status
    Loaders::Record
      .for(
        UsersMessage,
        column: :message_id,
        where: {role: :receiver},
        where_not: {read_at: nil}
      )
      .load(object.id)
      .then { |users_message| users_message ? :readed : :saved }
  end
end
