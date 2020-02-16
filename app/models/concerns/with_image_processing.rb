# frozen_string_literal: true

# Contains helpers to working with images
module WithImageProcessing
  def image_path_for(image)
    return default_image_path_for(image) if image.blank?

    Rails.application.routes.path_for(
      controller: 'active_storage/blobs',
      action: :show,
      signed_id: image.signed_id,
      filename: image.filename
    )
  end

  private

  def default_image_path_for(image)
    image.record.class::DEFAULT_ATTACHMENT_PATHS.fetch(image.name.to_sym, nil)
  end
end
