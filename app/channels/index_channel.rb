class IndexChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'index'
  end

  def receive(data)
    Article.find(data['id']).delete
    received_data = QueryHandler.new('article').call
    ActionCable.server.broadcast('index', received_data)
  end
end
