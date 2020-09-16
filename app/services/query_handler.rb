class QueryHandler

  def initialize(option, params={})
    @option = option
    @params = params
  end

  def call
    begin
      if @option == 'article'
        if !@params.present?
          result = Article.all
        else
          if @params[:q].present?
            result = Article.where('Name LIKE :query OR Text LIKE :query OR Article_type LIKE :query', query: "%#{@params[:q]}%")
          else
            result = Article.all
          end

          if @params[:sort].present?
            result = Article.all.sort_by { |article| article[@params[:sort]] }
          end

          if @params[:art_group].present?
            return response_data(grouped_articles_list, true)
          end
        end
      elsif @option == 'story'
        if !@params.present?
          result = decorate_story(Story.all)
        else
          if @params[:sort].present?
            result = decorate_story(Story.all.sort_by { |article| article[@params[:sort]] })
          end

          if @params[:story_group].present?
            return response_data(grouped_stories_list, true)
          end
        end
      end

      response_data(result).to_json
    rescue => error
      Rails.logger.info "Something wrong, #{error}"
    end
  end

  private

  def grouped_stories_list
    option = @params[:story_group].to_sym
    stories = decorate_story(Story.all)
    groups = stories.pluck(option).uniq

    groups.map do |group|
      {
          group: group,
          grouped_list: stories.select {|story| story[option] == group}
      }
    end
  end

  def grouped_articles_list
    option = @params[:art_group].to_sym
    articles = Article.all
    groups = articles.pluck(option).uniq

    groups.map do |group|
      {
          group: group,
          grouped_list: articles.select {|article| article[option] == group}
      }
    end
  end

  def decorate_story(data)
    data.map do |story|
      articles = story.articles
      {
          id: story.id,
          name: story.name,
          articles: articles.count,
          last_created: articles.last.created_at
      }
    end
  end

  def response_data(data, grouped=false)
    {
        grouped: grouped,
        list: data
    }
  end

end