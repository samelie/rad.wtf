import { cover, contain } from 'intrinsic-scale';
import { StyleSheet, css } from 'aphrodite';

let baseRoute = "";
if (process.env.NODE_ENV === "production") {

} else if (process.env.NODE_ENV === "github") {

}

require('fastclick')(document.body);
var html = require('choo/html')
var log = require('choo-log')
var choo = require('choo')

var app = choo()
app.use(log())

function logger(state, emitter) {
  emitter.on('*', function(messageName, data) {
    console.log('event', messageName, data)
  })
}
app.use(require('./model'))
app.use(logger);

const onload = (el) => {
}

//VIEWS
const menu = require('./views/menu')
const sites = require('./views/sites')

function mainView(state, prev, send) {
  return html `
    <div
    class="app"
    onload=${onload}
    >
    <div class="menu">
      <div class="menu--title">rad sites:</div>
      ${menu(state.sites, prev, send)}
    </div>
    <div class="sites">
      ${sites(state.sites, prev, send)}
    </div>
    </div>
  `
}
app.route(`/${baseRoute}`, mainView)

var tree = app.start()
document.body.appendChild(tree)
