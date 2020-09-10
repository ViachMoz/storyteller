15.times do
  Story.create!(name: Faker::Quote.yoda)
end

Story.all.each do |story|
  rand(1...10).times do
    Article.transaction do
      Article.create!(
          story_id: story.id,
          name: Faker::Games::Heroes.name,
          article_type: Faker::Games::Witcher.school,
          text: Faker::Quotes::Shakespeare.as_you_like_it_quote
      )
    end
  end
end