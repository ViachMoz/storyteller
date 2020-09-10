class MainPageController < ApplicationController
  before_action :set_article, only: [:show, :edit, :update, :destroy]

  def index
    if !request.query_parameters.present?
      @articles = {
          grouped: false,
          list: Article.all
      }.to_json

      @stories = Story.all.map do |story|
        {
            id: story.id,
            name: story.name,
            articles: story.articles.count
        }
      end.to_json

    else

      if params[:place] == 'article'
        # Поиск по запросу
        if params[:q].present?
          result = Article.where('Name LIKE :query OR Text LIKE :query OR Article_type LIKE :query', query: "%#{params[:q]}%")

          @articles = {
              grouped: false,
              list: result
          }
        else
          @articles = {
              grouped: false,
              list: Article.all
          }.to_json
        end

        # Сортировка по полям
        if params[:sort].present?
          @articles = {
              grouped: false,
              list: Article.all.sort_by { |article| article[params[:sort]] }
          }
        end

        if params[:art_group].present?
          option = params[:art_group].to_sym
          articles = Article.all
          groupes = articles.pluck(option).uniq

          grouped_list = groupes.map do |group|
            {
                group: group,
                grouped_list: articles.select {|article| article[option] == group}
            }
          end


          @articles = {
              grouped: true,
              list: grouped_list
          }
        end

        render json: @articles
      else

        # Сортировка по полям
        if params[:sort].present?
          @stories = Story.all.sort_by { |article| article[params[:sort]] }.map do |story|
            {
                id: story.id,
                name: story.name,
                articles: story.articles.count
            }
          end
        end

        render json: @stories
      end

    end
  end

end
