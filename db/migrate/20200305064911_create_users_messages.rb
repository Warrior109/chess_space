# frozen_string_literal: true

class CreateUsersMessages < ActiveRecord::Migration[6.0]
  def change
    create_table :users_messages do |t|
      t.references :user, null: false, foreign_key: true
      t.references :message, null: false, foreign_key: true
      t.datetime :read_at
      t.datetime :deleted_at
      t.string :role

      t.timestamps
    end
  end
end
