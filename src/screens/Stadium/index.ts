class Stadium {
  clickClubTab = () => {
    return ''
  }

  getActions() {
    return {
      clickClubTab: this.clickClubTab.bind(this),
    }
  }
}

export default Stadium
