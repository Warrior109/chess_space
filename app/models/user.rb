# frozen_string_literal: true

# User model
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :validatable, password_length: 8..128

  acts_as_paranoid

  has_one_attached :original_avatar
  has_one_attached :thumbnail_avatar

  validates :first_name, presence: true
  validates :last_name, presence: true

  # List of default paths for attachments. Used in the WithImageProcessing#default_image_path_for
  DEFAULT_ATTACHMENT_PATHS = {
    original_avatar: '/images/user-default-avatar.svg',
    thumbnail_avatar: '/images/user-default-avatar.svg'
  }.freeze

  reverse_geocoded_by :lat, :lng do |obj, results|
    geo = results.first
    if geo
      obj.country_code = geo.country_code
      obj.state = geo.state || geo.province
      obj.city = geo.city
      obj.state_code = geo.state_code || geo.province_code
      obj.state_district = geo.state_district || geo.county
    end
  end
  after_validation :reverse_geocode

  def as_json(*args)
    super.merge(
      original_avatar: {url: image_path_for(original_avatar)},
      thumbnail_avatar: {url: image_path_for(thumbnail_avatar)}
    )
  end
end
