module.exports = (state, emitter) => {

  emitter.on('site-clicked', (label) => {
    console.log(label);
    state.sites.forEach(site => {
      site.selected = site.label === label
    })
  })

  state.sites = [{
    label: 'DeuxTube',
    selected: true,
    url: 'https://samelie.github.io/rad.wtf-deuxtube/'
  },{
    label: 'Alhambra',
    selected: false,
    url: 'https://samelie.github.io/thealhambraproject.com/desktop-tour/'
  },{
    label: 'Mars',
    selected: false,
    url: 'https://samelie.github.io/mars-amenothep/'
  }]

  emitter.emit('render')
}
