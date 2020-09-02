Rails.application.routes.draw do
  root 'articles#index'

  resources :stories
  resources :articles
end
