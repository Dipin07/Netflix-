import express from 'express';
import authRoutes from './routes/auth.route.js'

const app = express();


app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

app.use('/api/v1/auth', authRoutes);

app.listen(5005, () => {
    console.log('Server is running on port 5005');
})