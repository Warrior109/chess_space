# frozen_string_literal: true

class Graphqls::RetrieveVariablesFromMultipartParams < ActiveInteraction::Base
  hash :params, strip: false

  def execute
    file_keys = retrieve_file_keys
    retrieve_file_hash(file_keys) if file_keys
  end

  private

  def retrieve_file_keys
    params[:variables_keys]&.split(';')
  end

  def retrieve_file_hash(file_keys)
    file_keys.each_with_object({}) do |file_key, hash|
      file = params[file_key]
      deep_hash = generate_deep_hash(file_key, file)
      hash.deep_merge!(deep_hash)
    end
  end

  def generate_deep_hash(file_key, file)
    file_key.split('/').reverse.inject(file) { |val, key| { key => val } }
  end
end
