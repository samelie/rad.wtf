module.exports = (state, emitter) => {
  state.sites = [{
    label: 'DeuxTube',
    selected:true,
    url: 'https://samelie.github.io/rad.-deuxtube/'
  }]
  emitter.emit('render')
}
