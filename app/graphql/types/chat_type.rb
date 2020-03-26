# frozen_string_literal: true

# graphql implementation for Chat model
class Types::ChatType < Types::BaseObject
  field :id, Integer, null: false
  field :messages, [Types::MessageType], null: false
  field :companion, Types::UserType, null: false
  field :last_message, Types::MessageType, null: true
  field :created_at, GraphQL::Types::ISO8601DateTime, null: false

  def messages
    Loaders::AssociationLoader.for(Chat, :messages).load(object)
  end

  # FIXME: for now we have only 2 participants in chat, so this works fine now.
  # When we will have group chats - please, rewrite this method.
  def companion
    Loaders::AssociationLoader
      .for(Chat, :users)
      .load(object)
      .then { |users| (users - [context[:current_user]]).first }
  end

  def last_message
    Loaders::AssociationLoader.for(Chat, :last_message).load(object)
  end
end
