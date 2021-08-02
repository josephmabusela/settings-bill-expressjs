const express = require('express');
const exphbs  = require('express-handlebars');
//const bodyParser = require('body-parser');
const SettingsBill = require('./settings-bill');

const app = express();
const settingsBill = SettingsBill();

app.engine('handlebars', exphbs({layoutsDir: 'views/layouts/'}));
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.render('index', {
      settings: settingsBill.getSettings(),
      totals: settingsBill.totals()
    });
});

app.post('/settings', function(req, res){
   settingsBill.setSettings({
       callCost: req.body.callCost,
       smsCost: req.body.smsCost,
       warningLevel: req.body.warningLevel,
       criticalLevel: req.body.criticalLevel
   });
   console.log(settingsBill.getSettings());
   res.redirect('/');
});

app.post('/action', function(req, res) {
  
  settingsBill.recordAction(req.body.actionType);
  res.redirect('/');
});

app.get('/actions', function(req, res) {
  res.render('actions', {
    actions: settingsBill.actions()
  })
});

app.get('/actions/:actionType', function(req, res) {
  	
  const actionType = req.params.actionType;

  res.render('actions', {
    actions: settingsBill.actionsFor(actionType)
  })
});

let PORT = process.env.PORT || 3010;

app.listen(PORT, function(){
  console.log('App started on port:', PORT);
});