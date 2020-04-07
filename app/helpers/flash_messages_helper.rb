# frozen_string_literal: true

# helper to show flash messages via toastr
module FlashMessagesHelper
  TOASTR_NOTIFY_TYPES = %i[success warning error].freeze

  def retrieve_flash_data
    flash.each_with_object([]) do |(key, value), array|
      toastr_type = retrieve_toastr_type(key)
      if value.is_a? Array
        value.each do |msg|
          array.push(type: toastr_type, title: t("toastr_titles.#{toastr_type}"), message: msg)
        end
      else
        array.push(type: toastr_type, title: t("toastr_titles.#{toastr_type}"), message: value)
      end
    end
  end

  def retrieve_toastr_type(type)
    if type.eql?('alert')
      'error'
    elsif type.eql?('notice')
      'success'
    elsif TOASTR_NOTIFY_TYPES.include?(type)
      type
    else
      'info'
    end
  end
end
