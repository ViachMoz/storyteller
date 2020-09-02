json.extract! article, :id, :name, :text, :type, :created_at, :updated_at
json.url article_url(article, format: :json)
