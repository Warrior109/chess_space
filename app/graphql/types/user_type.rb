

class Types::UserType < Types::BaseObject
  field :id, ID, null: false
  field :first_name, String, null: false
  field :last_name, String, null: false
  field :email, String, null: false
  field :trainer, Boolean, null: false
  field :chess_category, String, null: true
  field :birthday, GraphQL::Types::ISO8601DateTime, null: true
  field :country_code, String, null: true
  field :state, String, null: true
  field :city, String, null: true
  field :lat, Float, null: true
  field :lng, Float, null: true
  field :state_code, String, null: true
  field :state_district, String, null: true
  field :goal, String, null: true
  field :about_me, String, null: true
end
