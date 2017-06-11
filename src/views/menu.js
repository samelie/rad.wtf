const html = require('choo/html')

const generateEls = (sites) => (html `
  <li
    class="sites--item"
  >${sites.label}</li>`)

module.exports = (sites, emit) => {
  return html `
        <ul>
            ${generateEls(sites[0])}
        </ul>
      `
}
