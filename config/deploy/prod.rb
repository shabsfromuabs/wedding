role :web, %w{wedding@artem-natali.com}
role :app, %w{wedding@artem-natali.com}

set :rvm_ruby_version, '2.3.0@wedding'
set :rvm_type, :user
set :branch, :master
set :rails_env, 'production'

server 'artem-natali.com', user: 'wedding', roles: %w{web app}
