module.exports = {
    addComment: (req, res) => {
        const payload = req.body;
        const eventId = payload.eventId;
        // get user from authentication context
        const authorId = '';
        const text = payload.text;
        const currentDate = new Date();


        // modify in the db

        const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()} `;
        const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()} ${currentDate.getHours() >= 12 ? 'pm' : 'am'}`;
        const formattedDateTime = formattedDate + formattedTime;

        console.log(`Comment was created for user ${authorId} with text ${text} for an event ${eventId} on the date ${formattedDateTime}`);
        return res.status(200).json({
            id: 11,
            userName: 'friend',
            text: text,
            date: formattedDateTime});
    },

    deleteComment: (req, res) => {
        const commentId = req.params.id;

        // modify in the db

        console.log(`Comment ${commentId} was deleted`);
        return res.status(200);
    },
}
