# frozen_string_literal: true

class CreateUsersChats < ActiveRecord::Migration[6.0]
  def change
    create_table :users_chats do |t|
      t.references :user, null: false, foreign_key: true
      t.references :chat, null: false, foreign_key: true
      t.datetime :deleted_at

      t.timestamps
    end
  end
end
