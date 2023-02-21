class Store {
  static getActions() {
    return ''
  }

  clickPacks = () => {
    return ''
  }

  getActions() {
    return {
      clickPacks: this.clickPacks.bind(this),
    }
  }
}

export default Store
