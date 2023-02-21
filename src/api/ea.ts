export default class Ea {
  eaHeaders: {
    [key: string]: string
  } = {
    'Accept': '*/*',
    'Accept-Language': 'en-GB,en;q=0.5',
    'Connection': 'keep-alive',
    'Content-Type': 'application/json',
    'Origin': 'https://www.ea.com',
    'Referer': 'https://www.ea.com/',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-site',
    'Sec-GPC': '1',
    'User-Agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
    'sec-ch-ua': '"Not?A_Brand";v="8", "Chromium";v="108", "Brave";v="108"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
  }
  eaRaw = JSON.stringify({
    count: 91,
    sort: 'desc',
    /* "value" | ? */
    sortBy: 'value',
    start: 0,
    type: 'player',
  })
  private browserToken: string

  constructor({ browserToken }: { browserToken: string }) {
    this.browserToken = browserToken
  }

  makeHeaders = () => {
    const myHeaders = new Headers()
    myHeaders.append('X-UT-SID', this.browserToken)
    Object.entries(this.eaHeaders).forEach(([key, value]) => {
      myHeaders.append(key, value)
    })
    return myHeaders
  }

  makeRequestOptions = () => {
    const requestOptions = {
      method: 'POST',
      headers: this.makeHeaders(),
      body: this.eaRaw,
      redirect: 'follow',
    }

    return requestOptions
  }
}
