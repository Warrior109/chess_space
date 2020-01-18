# frozen_string_literal: true

class Mutations::BaseAuthMutation < Mutations::BaseMutation
  def self.visible?(context)
    super && context[:current_user].present?
  end
end
