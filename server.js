const express = require('express');
const app = express();
const accountRoutes = require('./routes/accountRoutes');
const destinationRoutes = require('./routes/destinationRoutes');
const dataHandlerRoutes = require('./routes/dataHandlerRoutes')


app.use(express.json());

app.use('/account', accountRoutes);
app.use('/destination',destinationRoutes);
app.use('server',dataHandlerRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));