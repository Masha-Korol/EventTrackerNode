const mongoose = require('mongoose');

async function connectToMongoDB() {
    try {
        await mongoose.connect(getMongoDBUri());
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Terminate the application on connection failure
    }
}

function getMongoDBUri() {
    const mongoUsername = process.env.MONGO_USERNAME || 'maria';
    const mongoPassword = process.env.MONGO_PASSWORD || 'fh348a';
    const mongoHost = process.env.MONGO_HOST || 'localhost';
    const mongoPort = process.env.MONGO_PORT || 27017;
    const mongoDatabase = process.env.MONGO_DATABASE || 'event-tracker';

    return `mongodb://${mongoUsername}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDatabase}`;
}

module.exports = connectToMongoDB;
