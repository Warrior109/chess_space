# frozen_string_literal: true

# graphql implementation of User model
class Types::UserType < Types::BaseObject
  field :id, Integer, null: false
  field :first_name, String, null: false
  field :last_name, String, null: false
  field :email, String, null: false
  field :trainer, Boolean, null: false
  field :skill_level, String, null: true
  field :birthday, GraphQL::Types::ISO8601Date, null: true
  field :country_code, String, null: true
  field :state, String, null: true
  field :city, String, null: true
  field :lat, Float, null: true
  field :lng, Float, null: true
  field :address, String, null: true
  field :state_code, String, null: true
  field :state_district, String, null: true
  field :goal, String, null: true
  field :about_me, String, null: true
  field :original_avatar, Types::ImageType, null: true
  field :thumbnail_avatar, Types::ImageType, null: true
  field :google_uid, String, null: true
  field :facebook_uid, String, null: true

  def original_avatar
    Loaders::AssociationLoader.for(User, :original_avatar_blob).load(object)
  end

  def thumbnail_avatar
    Loaders::AssociationLoader.for(User, :thumbnail_avatar_blob).load(object)
  end
end
