class AddFieldsToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
    add_column :users, :trainer, :boolean, default: false
    add_column :users, :chess_category, :string
    add_column :users, :birthday, :date
    add_column :users, :country_code, :string
    add_column :users, :state, :string
    add_column :users, :city, :string
    add_column :users, :lat, :float
    add_column :users, :lng, :float
    add_column :users, :state_code, :string
    add_column :users, :state_district, :string
    add_column :users, :goal, :string
    add_column :users, :about_me, :string
  end
end
