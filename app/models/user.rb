# frozen_string_literal: true

# User model
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :first_name, presence: true
  validates :last_name, presence: true

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
end
