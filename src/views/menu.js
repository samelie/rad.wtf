const html = require('choo/html')

const generateEls = (sites, emit) => (html `
  <li
    class="sites--item"
    onclick=${()=>(emit("site-clicked",sites.label))}
  >${sites.label}</li>`)

module.exports = (sites, emit) => {
  return html `
        <ul>
            ${generateEls(sites[0], emit)}
        </ul>
      `
}
