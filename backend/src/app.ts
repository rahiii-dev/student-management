import express from 'express';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (_, res) => {
    res.json("Welcome student db");
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})