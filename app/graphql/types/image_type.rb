# frozen_string_literal: true

# graphql implementation for image type.
# Used in user avatar, for example
class Types::ImageType < Types::BaseObject
  field :url, String, null: false

  def url
    Rails.application.routes.path_for(
      controller: 'active_storage/blobs',
      action: :show,
      signed_id: object.signed_id,
      filename: object.filename
    )
  end
end
