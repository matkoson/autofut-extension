class Leaderboards {
  clickTransferProfit = () => {
    return ''
  }

  getActions() {
    return {
      clickTransferProfit: this.clickTransferProfit.bind(this),
    }
  }
}

export default Leaderboards
