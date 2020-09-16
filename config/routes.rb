Rails.application.routes.draw do
  root 'main_page#index'

  mount ActionCable.server => '/cable'
end
