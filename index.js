const express = require('express');

const EventRoutes = require('./events/events-routes');
const CommentRoutes = require('./comments/comments-routes');
const UserRoutes = require('./users/users-routes');
const RecommendationRoutes = require('./recommendations/recommendations-routes');
const ChatRoutes = require('./chats/chats-routes');
const CityRoutes = require('./cities/cities-routes');
const ArtistRoutes = require('./artists/astists-routes');
const VenueRoutes = require('./venues/venues-routes');

const app = express();

var cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/events', EventRoutes);
app.use('/api/comments', CommentRoutes);
app.use('/api/users', UserRoutes);
app.use('/api/recommendations', RecommendationRoutes);
app.use('/api/chats', ChatRoutes);
app.use('/api/cities', CityRoutes);
app.use('/api/artists', ArtistRoutes);
app.use('/api/venues', VenueRoutes);

app.listen(9000, function(){
    console.log('Server listening on port 9000...');
});
