var sendNotification = function (data) {
    var headers = {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "Basic Nzk4NjJkNDQtMDNjNi00OTlkLTg2YWQtOTYwMzJhMzc0N2Mw"
    };

    var options = {
        host: "onesignal.com",
        port: 443,
        path: "/api/v1/notifications",
        method: "POST",
        headers: headers
    };

    var https = require('https');
    var req = https.request(options, function (res) {
        res.on('data', function (data) {
            console.log("Response:");
            console.log(JSON.parse(data));
        });
    });

    req.on('error', function (e) {
        console.log("ERROR:");
        console.log(e);
    });

    req.write(JSON.stringify(data));
    req.end();
};

;
exports = module.exports = function (io) {
    // Set socket.io listeners.
    io.on('connection', (socket) => {


        // On conversation entry, join broadcast channel
        socket.on('enter app', (userId) => {
            socket.join(userId);
            console.log('joined app' + userId);


        });
        // On conversation entry, join broadcast channel
        socket.on('enter conversation', (conversation) => {
            socket.join(conversation);
            console.log('joined ' + conversation);
        });


        socket.on('like recipe', (likes) => {
            io.sockets.in(likes.toUser).emit('refresh likes', likes);


        });

        socket.on('leave conversation', (conversation) => {
            socket.leave(conversation);
            console.log('left ' + conversation);

        });

        socket.on('new message', (conversation) => {
            io.sockets.in(conversation.conversationID).emit('refresh messages', conversation);
            io.sockets.in(conversation.toUser).emit('refresh messages', conversation);
            var message = {
                app_id: "0c7e57fe-dc39-46c7-bc1c-050de425b983",
                contents: {"en": "Vous avez reçu un nouveau message"},
                filters: [
                    {"field": "tag", "key": "userId", "relation": "=", "value": conversation.toUser},

                ],

            };

            sendNotification(message)
        });

        socket.on('new notifications', (conversation) => {
            console.log(conversation);
            if (typeof conversation.content !== "undefined"
                && typeof conversation.content.typeNotif !== "undefined"
                && conversation.content.typeNotif == "like"
                && typeof conversation.liker !== "undefined"
            ) {
                var message = {
                    app_id: "0c7e57fe-dc39-46c7-bc1c-050de425b983",
                    contents: {"en": "" + conversation.liker.nickName + " a aimé votre recette " + conversation.content.recipe.title},
                    filters: [
                        {"field": "tag", "key": "userId", "relation": "=", "value": conversation.toUserId},

                    ],

                };
            }
            else if (typeof conversation.content !== "undefined"
                && typeof conversation.content.typeNotif !== "undefined"
                && conversation.content.typeNotif == "follow") {
                var message = {
                    app_id: "0c7e57fe-dc39-46c7-bc1c-050de425b983",
                    contents: {"en": "" + conversation.liker.nickName + " a commencé à vous suivre "},
                    filters: [
                        {"field": "tag", "key": "userId", "relation": "=", "value": conversation.toUserId},

                    ],

                };
            }
            sendNotification(message)
            io.sockets.in(conversation.toUserId).emit('refresh notifications', conversation);
        });
        socket.on('read notifications', (conversation) => {
            io.sockets.in(conversation.toUserId).emit('read notifications', conversation);
        });
        socket.on('share recipe message', (conversation) => {

            io.sockets.in(conversation.toUser).emit('refresh messages', conversation);
            var message = {
                app_id: "0c7e57fe-dc39-46c7-bc1c-050de425b983",
                contents: {"en": "Vous avez reçu un nouveau message"},
                filters: [
                    {"field": "tag", "key": "userId", "relation": "=", "value": conversation.toUser},

                ],

            };

            sendNotification(message)
        });

        socket.on('disconnect', () => {
            // console.log('user disconnected');
        });
    });
};