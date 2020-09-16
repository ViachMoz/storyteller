class MainPageController < ApplicationController
  def index
    if !request.query_parameters.present?
      @articles = QueryHandler.new('article').call
      @stories = QueryHandler.new('story').call
    else
      render json: QueryHandler.new(params[:place], params).call
    end
  end
end
