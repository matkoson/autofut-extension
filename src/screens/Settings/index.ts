class Settings {
  clickSignOut = () => {
    return ''
  }

  getActions() {
    return {
      clickSignOut: this.clickSignOut.bind(this),
    }
  }
}

export default Settings
