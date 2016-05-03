Rails.application.routes.draw do
  
  get :map, to: 'main#map'
  
  root 'main#main'
end
