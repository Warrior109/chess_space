# frozen_string_literal: true

# Attach avatar to user
class Users::AttachAvatar < ApplicationInteraction
  object :user, class: User

  file :original_avatar, default: nil
  file :thumbnail_avatar, default: nil

  def execute
    inputs.except(:user).compact.each(&method(:attach_avatar))
    user
  end

  private

  def attach_avatar(key, avatar)
    user.public_send(key).attach(
      io: avatar,
      **file_attrs(avatar)
    )
  end

  def file_attrs(file) # rubocop:disable Metrics/AbcSize
    case file
    when ->(f) { f.respond_to?(:original_filename) }
      {
        filename: file.original_filename,
        content_type: Rack::Mime::MIME_TYPES[File.extname(file.original_filename)]
      }
    when ->(f) { f.respond_to?(:content_type) && f.content_type.present? }
      {
        filename: "avatar#{Rack::Mime::MIME_TYPES.invert[file.content_type]}",
        content_type: file.content_type
      }
    else
      {
        filename: File.basename(file.path),
        content_type: Rack::Mime::MIME_TYPES[File.extname(file.path)]
      }
    end
  end
end
