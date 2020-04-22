# frozen_string_literal: true

# Connection for messages.
# Initial loading (when not used before or after cursors) calculate offset with the
# unread_messages_count
class Connections::MessagesConnection < GraphQL::Pagination::ActiveRecordRelationConnection
  def initialize(items, **args)
    super
    @unread_messages_count = items.unread(current_user.id).count
  end

  # Starts from the first unread message
  def relation_count(relation)
    super.then { |count|
      next count if !last || before || after

      count - [unread_messages_count - last, 0].max
    }
  end

  private

  attr_reader :unread_messages_count

  def current_user
    context.fetch(:current_user)
  end
end
