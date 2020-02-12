# frozen_string_literal: true

# Update user
class Mutations::Users::Update < Mutations::BaseAuthMutation
  field :user, Types::UserType, null: true
  field :errors, [String], null: false

  argument :trainer, Boolean, required: false
  argument :skill_level, String, required: false
  argument :birthday, String, required: false
  argument :lat, Float, required: false
  argument :lng, Float, required: false
  argument :address, String, required: false
  argument :goal, String, required: false
  argument :about_me, String, required: false
  argument :original_avatar, Types::FileType, required: false
  argument :thumbnail_avatar, Types::FileType, required: false

  def resolve(
    trainer: nil, skill_level: nil, goal: nil, about_me: nil, birthday: nil,
    lat: nil, lng: nil, address: nil, original_avatar: nil, thumbnail_avatar: nil
  )
    interactor = Users::Update.run(
      user: current_user,
      trainer: trainer,
      skill_level: skill_level,
      lat: lat,
      lng: lng,
      address: address,
      birthday: birthday,
      goal: goal,
      about_me: about_me,
      original_avatar: original_avatar,
      thumbnail_avatar: thumbnail_avatar
    )

    if interactor.valid?
      {
        user: interactor.result,
        errors: []
      }
    else
      {
        user: nil,
        errors: interactor.errors.full_messages
      }
    end
  end
end
