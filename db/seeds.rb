# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create(username: 'AdminUser', password: 'testing12', admin: true)

Recommendation.create(name: "Paris, France" , description: "The Capitol of France, home to the Eiffel tower and Paris Saint-Germain F.C.", image_url: "https://en.parisinfo.com/var/otcp/sites/images/node_43/node_51/node_230/vue-a%C3%A9rienne-paris-tour-eiffel-coucher-de-soleil-%7C-630x405-%7C-%C2%A9-fotolia/19544352-1-fre-FR/Vue-a%C3%A9rienne-Paris-Tour-Eiffel-coucher-de-soleil-%7C-630x405-%7C-%C2%A9-Fotolia.jpg")
Recommendation.create(name: "Tokyo, Japan", description: "The Capitol of Japan and one of the largest cities in the world.  It sits next to the majestic Mt Fuji", image_url: "https://media.cntraveler.com/photos/60341fbad7bd3b27823c9db2/16:9/w_1920,c_limit/Tokyo-2021-GettyImages-1208124099.jpg")
Recommendation.create(name: "FIji", description: "A group of tropical islands. It features many islands of various sizes and has plenty of waterfront accomidations including some homes on piers above the ocean", image_url: "https://cache.marriott.com/marriottassets/marriott/NANMC/nanmc-view-0007-hor-wide.jpg?interpolation=progressive-bilinear&downsize=1440px:*")
