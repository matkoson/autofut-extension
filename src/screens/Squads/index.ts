class Squads {
  clickActiveSquad = () => {
    return ''
  }

  getActions() {
    return {
      clickActiveSquad: this.clickActiveSquad.bind(this),
    }
  }
}

export default Squads
