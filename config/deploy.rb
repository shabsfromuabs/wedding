# config valid only for current version of Capistrano
lock '3.4.0'

set :application, 'wedding'
set :repo_url, 'git@github.com:shabsfromuabs/wedding.git'

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
# set :deploy_to, '/var/www/my_app_name'

# Default value for :scm is :git
# set :scm, :git

# Default value for :format is :pretty
# set :format, :pretty

# Default value for :log_level is :debug
# set :log_level, :debug

set :user, 'wedding'
set :puma_threads, [4, 16]
set :puma_workers, 0

set :pty, true
set :use_sudo, false
set :stage, :production
set :deploy_via, :remote_cache
set :deploy_to, "/home/#{fetch(:user)}/www/site"
set :puma_bind, "unix://#{shared_path}/tmp/sockets/#{fetch(:application)}-puma.sock"
set :puma_state, "#{shared_path}/tmp/pids/puma.state"
set :puma_pid, "#{shared_path}/tmp/pids/puma.pid"
set :puma_access_log, "#{release_path}/log/puma.error.log"
set :puma_error_log, "#{release_path}/log/puma.access.log"
set :ssh_options, {forward_agent: true}
set :puma_preload_app, true
set :puma_worker_timeout, nil
set :puma_init_active_record, true # Change to false when not using ActiveRecord

# Default value for :linked_files is []
set :linked_files, fetch(:linked_files, []).push('.env', 'config/database.yml')

# Default value for linked_dirs is []
set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system', 'public/uploads')

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
set :keep_releases, 3

namespace :puma do
  desc 'Create Directories for Puma Pids and Socket'
  task :make_dirs do
    on roles(:app) do
      execute "mkdir #{shared_path}/tmp/sockets -p"
      execute "mkdir #{shared_path}/tmp/pids -p"
    end
  end

  before :start, :make_dirs
end

namespace :deploy do
  desc 'Initial Deploy'
  task :initial do
    on roles(:app) do
      before 'deploy:restart', 'puma:start'
      invoke 'deploy'
    end
  end

  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      invoke 'puma:restart'
    end
  end

  after :finishing, :cleanup
  after :finishing, :restart
end

desc 'Invoke a rake command on the remote server'
task :invoke, [:command] => 'deploy:set_rails_env' do |task, args|
  on primary(:app) do
    within current_path do
      with :rails_env => fetch(:rails_env) do
        rake args[:command]
      end
    end
  end
end

namespace :rails do
  desc 'Open the rails console on each of the remote servers'
  task console: 'rvm:hook' do
    on roles(:app), primary: true do |host|
      execute_interactively host, 'console production'
    end
  end

  task migrate: 'rvm:hook' do
    on roles(:app), primary: true do |host|
      execute_interactively host, 'db:migrate RAILS_ENV=production'
    end
  end

  task assets_precompile: 'rvm:hook' do
    on roles(:app), primary: true do |host|
      execute_interactively host, 'assets:precompile RAILS_ENV=production'
    end
  end

  task seed: 'rvm:hook' do
    on roles(:app), primary: true do |host|
      execute_interactively host, 'db:seed RAILS_ENV=production'
    end
  end
end

def execute_interactively(host, command)
  command = "cd #{fetch(:deploy_to)}/current && #{SSHKit.config.command_map[:bundle]} exec rails #{command}"
  puts command if fetch(:log_level) == :debug
  exec "ssh -l #{host.user} #{host.hostname} -p #{host.port || 22} -t '#{command}'"
end

# Running tasks from local machine:
#
# cap prod rails:console
# cap prod rails:migrate
# cap prod rails:assets_precompile
# cap prod rails:stripe_prepare
# cap prod rails:seed
# cap prod puma:stop
# cap prod puma:start
# cap prod puma:restart
#
# Run any rails task from server-side:
# cd ~/www/site/current && ~/.rvm/bin/rvm 2.3.0@wedding do bundle exec rails assets:precompile RAILS_ENV=production
