# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all
Item.destroy_all
require 'faker'


10.times do 
    User.create(
    name: Faker::Name.name,
    email: Faker::Internet.email,
    location: Faker::Address.city
    )
end


Item.create(name: 'Balenciaga shoes', description: 'really nice shoes', price: '400', image: "https://n.nordstrommedia.com/id/sr3/4b7773f8-a5e2-448d-a4b7-dd2a17f2f5b7.jpeg?crop=pad&pad_color=FFF&format=jpeg&trim=color&trimcolor=FFF&w=780&h=838&dpr=2",
category: "Fashion",user_id: 2)
Item.create(name: 'Iphone 5', description: 'Great condition', price: '350', image: "https://banner2.kisspng.com/20180711/lzw/kisspng-iphone-6-plus-iphone-5s-gold-phone-png-5b46604621eda0.496203361531338822139.jpg",
category: "Technology",user_id: 5)
Item.create(name: 'Apple TV', description: 'open box', price: '99', image: "https://banner2.kisspng.com/20180705/uhl/kisspng-apple-tv-4th-generation-television-apple-tv-4k-apple-tv-5b3e985ab48655.0055958615308288907394.jpg",
category: "Technology",user_id: 1)
Item.create(name: 'Leonardo DiCaprio Painting', description: 'A painting', price: '35', image: "https://cdn.shopify.com/s/files/1/1944/7205/products/invincible_large.jpg",
category: "Art",user_id: 8)

