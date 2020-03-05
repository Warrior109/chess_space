# frozen_string_literal: true

class CreateMessages < ActiveRecord::Migration[6.0]
  def change
    create_table :messages do |t|
      t.references :chat, null: false, foreign_key: true
      t.string :text

      t.timestamps
    end
  end
end
