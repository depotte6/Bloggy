const express = require('express');
const path = require('path');
//paths
const routes = require('./controllers');
const sequelize = require('./config/connection');
//Session
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helpers = require('./utils/helper');
const hbs = exphbs.create({ helpers });
//set up the actual session
const sess = {
  secret: 'super secret secret',
  cookie: {
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
//initialize the server
const app = express();
const PORT = process.env.PORT || 4001;

//middlewear
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


//set handlebars as render engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
