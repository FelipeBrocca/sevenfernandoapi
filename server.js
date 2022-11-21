require('dotenv').config();
const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3500
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn');
const mongoose = require('mongoose')

connectDB();
app.use(express.json())
app.use(cors(corsOptions))
app.use('/', express.static(path.join(__dirname, 'public')))



app.use('/', require('./routes/root'));
app.use('/users', require('./routes/usersRoutes'));


mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
});