# frozen_string_literal: true

# Base class for mailers
class ApplicationMailer < ActionMailer::Base
  default from: 'ourchessspace@gmail.com'
  layout 'mailer'
end
