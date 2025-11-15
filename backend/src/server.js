require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const { Server } = require('socket.io');

const authRoutes = require('./routes/authRoutes');
const boardingRoutes = require('./routes/boardingRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const adminRoutes = require('./routes/adminRoutes');
const recommendRoutes = require('./routes/recommendRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log('MongoDB connected'))
.catch(err=>{ console.error('MongoDB connection error', err); process.exit(1); });

// mount routes
app.use('/api/auth', authRoutes);
app.use('/api/boardings', boardingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/recommend', recommendRoutes);
app.use('/api/uploads', uploadRoutes);

app.get('/', (req,res)=>res.json({ ok: true }));

// socket io
io.on('connection', socket => {
  console.log('socket connected', socket.id);
  socket.on('joinRoom', ({ roomId }) => { socket.join(roomId); });
  socket.on('sendMessage', ({ roomId, message, from }) => {
    io.to(roomId).emit('receiveMessage', { message, from, time: Date.now() });
  });
  socket.on('disconnect', () => console.log('socket disconnected', socket.id));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=>console.log(`Server running on ${PORT}`));
module.exports = { io };
