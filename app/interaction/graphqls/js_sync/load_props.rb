# frozen_string_literal: true

module Graphqls::JsSync
  class LoadProps < ActiveInteraction::Base
    API_FILE_NAME = 'api.js'
    QUERIES_FOLDER_NAME = 'queries'

    object :core_path, class: Pathname
    string :js_action_name
    object :controller, class: ApplicationController
    object :user, default: nil
    array :variables, default: []

    def execute
      file_api_data = compose(ReadFile, pathname: core_path.join(API_FILE_NAME))
      query_names = compose(LoadQueryNames, data: file_api_data, queries_folder_name: QUERIES_FOLDER_NAME)
      queries = compose(LoadQueries, query_names: query_names, queries_folder_path: core_path.join(QUERIES_FOLDER_NAME))
      attrs = compose(LoadQueryAttributes, data: file_api_data, js_action_name: js_action_name)
      attrs = compose(LoadVariables, variables: variables, attrs: attrs)
      parsed_attrs = compose(ReplaceQueryNamesWithQueries, queries: queries, attributes: attrs)
      queries_params = compose(RubyHashFromString, string: parsed_attrs)
      data = compose(
        Graphqls::MultipleExecute,
        context: { current_user: user, controller: controller },
        queries: queries_params[:queries]
      ).as_json
      transform_hash = compose(CreateTransformGraphqlToReduxKeysHash, queries: queries)
      compose(TransformGraphqlKeysToReduxKeys, data: data, transform_hash: transform_hash)
    end
  end
end
