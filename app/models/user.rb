# frozen_string_literal: true

# User model
class User < ApplicationRecord
  extend Enumerize

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :validatable, :omniauthable,
    password_length: 8..128,
    omniauth_providers: %i[google_oauth2 facebook]

  acts_as_paranoid

  has_many :users_chats
  has_many :sorted_chats, -> { most_recent_order }, through: :users_chats, source: :chat
  has_many :chats, through: :users_chats
  has_many :users_messages
  has_many :messages, through: :users_messages

  has_one_attached :original_avatar
  has_one_attached :thumbnail_avatar

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :google_uid, uniqueness: {allow_nil: true}
  validates :facebook_uid, uniqueness: {allow_nil: true}

  enumerize :skill_level, in: %i[
    novice
    4_category
    3_category
    2_category
    1_category
    candidate_master
    master
    fide_master
    female_fide_master
    international_master
    female_international_master
    international_grandmaster
    female_internation_grandmaster
  ]

  # List of default paths for attachments. Used in the WithImageProcessing#default_image_path_for
  DEFAULT_ATTACHMENT_PATHS = {
    original_avatar: '/images/user-default-avatar.svg',
    thumbnail_avatar: '/images/user-default-avatar.svg'
  }.freeze

  OAUTH_PROVIDER_TO_UID_NAME = {
    google_oauth2: :google_uid,
    facebook: :facebook_uid
  }.freeze

  OAUTH_PROVIDER_TO_SOCIAL = {
    google_oauth2: 'Google',
    facebook: 'Facebook'
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
