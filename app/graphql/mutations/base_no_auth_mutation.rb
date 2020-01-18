# frozen_string_literal: true

class Mutations::BaseNoAuthMutation < Mutations::BaseMutation
  def self.visible?(context)
    super && context[:current_user].nil?
  end
end
