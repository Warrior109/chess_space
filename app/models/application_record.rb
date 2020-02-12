# frozen_string_literal: true

# base class for all models
class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def image_path_for(image)
    Rails.application.routes.path_for(
      controller: 'active_storage/blobs',
      action: :show,
      signed_id: image.signed_id,
      filename: image.filename
    )
  end
end
