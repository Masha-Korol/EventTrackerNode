module.exports = {
    getChatMessages: (req, res) => {
        const chatId = req.params.id;

        // get from the db

        return res.status(200).json({
            id: chatId,
            messages: [
                {id: 1, userName: 'Marina', text: 'Hello! how are you?', date: '11/20/2000'},
                {id: 2, userName: 'Maria', text: 'I\'m great! You?', date: '11/20/2000'},
                {id: 3, userName: 'Marina', text: 'Yeah. Me too. Btw, wanna go to the workshop tomorrow?', date: '11/20/2000'},
                {id: 4, userName: 'Maria', text: 'I\'d love to', date: '11/20/2000'},
            ]
        });
    },
}
