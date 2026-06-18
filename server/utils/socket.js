/* =====================================
   SOCKET.IO UTILITY
===================================== */

let io;

/* =====================================
   INITIALIZE SOCKET INSTANCE
===================================== */

/*
  Called Once During Server Startup

  Stores the Socket.io instance so it can
  be accessed throughout the application.
*/

const initSocket = (socketIoInstance) => {
  io = socketIoInstance;
};

/* =====================================
   GET SOCKET INSTANCE
===================================== */

/*
  Returns Initialized Socket.io Instance

  Used For:
  - Real-time Dashboard Updates
  - Appointment Notifications
  - Contact Form Notifications
  - Activity Log Updates
*/

const getIO = () => {
  if (!io) {
    throw new Error(
      "Socket.io has not been initialized"
    );
  }

  return io;
};

/* =====================================
   EXPORT UTILITIES
===================================== */

module.exports = {
  initSocket,
  getIO,
};