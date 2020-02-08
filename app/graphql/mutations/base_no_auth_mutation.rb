# frozen_string_literal: true

# Base class for all mutations which requires no authentication user
class Mutations::BaseNoAuthMutation < Mutations::BaseMutation
  def self.visible?(context)
    super && context[:current_user].nil?
  end

  private

  def sign_in(user)
    controller.sign_in(:user, user)
  end
end
