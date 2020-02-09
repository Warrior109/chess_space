# frozen_string_literal: true

# Add fields to user
class AddFieldsToUsers < ActiveRecord::Migration[6.0]
  def change # rubocop:disable Metrics/AbcSize
    change_table :users, bulk: true do |t|
      t.string :first_name
      t.string :last_name
      t.boolean :trainer, default: false
      t.string :skill_level
      t.date :birthday
      t.string :address
      t.string :country_code
      t.string :state
      t.string :city
      t.float :lat
      t.float :lng
      t.string :state_code
      t.string :state_district
      t.string :goal
      t.string :about_me
    end
  end
end
