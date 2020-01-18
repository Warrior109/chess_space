# frozen_string_literal: true

class Types::ImageType < Types::BaseObject
  field :thumb_url, String, null: false
  field :medium_url, String, null: false
  field :original_url, String, null: false

  def thumb_url
    object.url(:thumb)
  end

  def medium_url
    object.url(:medium)
  end

  def original_url
    object.url
  end
end
