class AddOmniauthIdsToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :google_uid, :string
    add_index :users, :google_uid
    add_column :users, :facebook_uid, :string
    add_index :users, :facebook_uid
  end
end
