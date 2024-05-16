const { Server } = require('socket.io');

module.exports = (httpServer) => {
    
    const io = new Server(httpServer,{
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });
    
    io.on('connection', (socket) => {
    
        console.log(`Cliente conectou! Id: ${socket.id}`);
    
        socket.on("change-client", (change) => {

            socket.broadcast.emit('change-server', change);
    
        })

        socket.on("delete-client", (change) => {

            socket.broadcast.emit('delete-server', change);
    
        })

        socket.on("post-client", (change) => {

            socket.broadcast.emit('post-server', change);
    
        })
    
    });

}