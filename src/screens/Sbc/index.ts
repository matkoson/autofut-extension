class Sbc {
  clickFavourites = () => {
    return ''
  }

  getActions() {
    return {
      clickFavourites: this.clickFavourites.bind(this),
    }
  }
}

export default Sbc
