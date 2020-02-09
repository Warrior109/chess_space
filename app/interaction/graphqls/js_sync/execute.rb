# frozen_string_literal: true

# TODO: refactoring this system and make correct comments
# .
class Graphqls::JsSync::Execute < ApplicationInteraction
  CORES_PATH = Rails.root.join('app/javascript/bundles/core').freeze

  object :controller, class: ApplicationController
  object :user, default: nil

  def execute
    redux_core_name = retrieve_js_core_name
    props = compose(
      Graphqls::JsSync::LoadProps,
      user: user,
      controller: controller,
      js_action_name: retrieve_js_action_name(redux_core_name),
      core_path: CORES_PATH.join(redux_core_name)
    )
    {redux_core_name => props}
  end

  private

  def retrieve_js_core_name
    "#{controller.action_name.camelize(:lower)}Screen"
  end

  def retrieve_js_action_name(redux_core_name)
    "fetch#{redux_core_name.camelize}Data"
  end
end
