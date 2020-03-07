# frozen_string_literal: true

# graphql implementation for Chat model
class Types::ChatType < Types::BaseObject
  field :id, Integer, null: false
  field :messages, [Types::MessageType], null: false
  field :companion, Types::UserType, null: false

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
end
