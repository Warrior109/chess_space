# frozen_string_literal: true

# graphql implementation for image type.
# Used in user avatar, for example
class Types::ImageType < Types::BaseObject
  include WithImageProcessing

  field :url, String, null: false

  def url
    image_path_for(object)
  end
end
