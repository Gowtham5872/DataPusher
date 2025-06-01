const express = require('express');
const app = express();
const accountRoutes = require('./routes/accountRoutes');


app.use(express.json());

app.use('/account', accountRoutes);


const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));