source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.7.0'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 6.0.2', '>= 6.0.2.1'
# Use sqlite3 as the database for Active Record
gem 'pg', '~> 1.0'
# Use Puma as the app server
gem 'puma', '~> 4.1'
# Use SCSS for stylesheets
gem 'sass-rails', '>= 6'
# Transpile app-like JavaScript. Read more: https://github.com/rails/webpacker
gem 'webpacker', '~> 4.0'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.7'
# Use Redis adapter to run Action Cable in production
gem 'redis', '~> 4.0'
# Use Active Model has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Active Storage variant
# gem 'image_processing', '~> 1.2'

gem 'memoist'
gem 'geocoder'
# For store env variables
gem 'dotenv-rails', require: 'dotenv/rails-now'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.4.2', require: false

# For implement interaction pattern
gem 'active_interaction'

# For login system
gem 'devise-async'
gem 'devise_invitable', '~> 1.7.0'
gem 'devise_token_auth'
gem 'devise_zxcvbn'

# Omniauth
gem 'omniauth'
gem 'omniauth-facebook'
gem 'omniauth-google-oauth2'

# GraphQL
gem 'graphql'
gem 'graphql-batch'

# Implement SPA
gem 'react_on_rails'

# For using Slim instead of erb
gem 'slim-rails'
group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'pry-rails'
  gem 'rspec-rails'
end

group :development do
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'

  ## Linting
  gem 'rubocop', require: false
  gem 'rubocop-rails', require: false
  gem 'rubocop-rspec', require: false
  gem 'slim_lint', require: false

  gem 'graphiql-rails'
  gem 'graphql-rails_logger'
end

group :test do
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '>= 2.15'
  gem 'selenium-webdriver'
  # Easy installation and use of web drivers to run system tests with browsers
  gem 'webdrivers'

  # rspec
  gem 'warden-rspec-rails'
  gem 'rspec-its'                 # its(:foo) syntax
  gem 'saharspec'                 # some syntactic sugar for RSpec
  gem 'factory_bot_rails'         # test factories
  gem 'faker'                     # fake data generator

  gem 'database_cleaner'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

gem 'mini_racer', platforms: :ruby
