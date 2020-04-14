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
  has_many :chats, through: :users_chats
  has_many :sorted_chats, -> { most_recent_order }, through: :users_chats, source: :chat
  has_many :unread_chats, ->(user) { unread(user.id) }, through: :users_chats, source: :chat

  has_one :recent_users_chat, -> { most_recent_order }, class_name: :UsersChat
  has_one :recent_chat, -> { most_recent_order }, through: :recent_users_chat, source: :chat

  has_many :users_messages
  has_many :messages, through: :users_messages
  has_many :unread_messages, ->(u) { unread(u.id) }, through: :users_messages, source: :message

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

  scope :readed_chat, ->(chat_id) {
    joins(:users_chats)
      .where(users_chats: {chat_id: chat_id})
      .joins(sanitize_sql_array([<<~SQL, chat_id]))
        LEFT OUTER JOIN users_messages unread_um
          ON unread_um.user_id = users.id
            AND unread_um.read_at IS NULL
            AND unread_um.role = 'receiver'
        LEFT OUTER JOIN messages unread_m
          ON unread_m.id = unread_um.message_id
            AND unread_m.chat_id = ?
      SQL
      .having('COUNT(unread_m.id) = 0')
      .group('users.id')
  }

  scope :with_recent_chat, ->(chat_id) {
    joins(<<~SQL)
      INNER JOIN (
        SELECT DISTINCT ON (id) users.id AS id,
          GREATEST(MAX(messages.created_at), chats.created_at) AS recent_time
        FROM users
        INNER JOIN users_chats ON users_chats.user_id = users.id
        INNER JOIN chats ON chats.id = users_chats.chat_id
        LEFT JOIN messages ON messages.chat_id = chats.id
        GROUP BY users.id, chats.created_at
        ORDER BY id, recent_time DESC
      ) AS recent_users ON recent_users.id = users.id

      LEFT JOIN (
        SELECT chats.id AS id, users_chats.user_id AS user_id,
          GREATEST(MAX(messages.created_at), chats.created_at) AS recent_time
        FROM chats
        LEFT JOIN messages ON messages.chat_id = chats.id
        INNER JOIN users_chats ON users_chats.chat_id = chats.id
        GROUP BY chats.id, users_chats.user_id
      ) AS recent_chats ON recent_chats.user_id = recent_users.id
        AND recent_users.recent_time = recent_chats.recent_time
    SQL
      .where('recent_chats.id = ?', chat_id)
  }
end
