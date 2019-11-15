
const cheerio = require('cheerio')
const axios = require('axios')


function request({ url, params, method, isSpider = false }) {
  return axios({
    method: method || 'get',
    url,
    data: params,
    params,
    transformResponse: [function (data) {
      // console.log(data)
      return isSpider ? data : JSON.parse(data)
    }],
  });
}

async function getLaji(name) {
  const { data } = await request({
    url: `https://lajifenleiapp.com/sk/${encodeURIComponent(name)}`,
    isSpider: true,
  })
  const $ = cheerio.load(data, {
    xml: {
      normalizeWhitespace: true,
      withDomLvl1: true,
      xmlMode: true,
      decodeEntities: false
    }
  })

  let type = '';
  $('.container .row').eq(3).find('.col-xs-12 h1 span').each((index, element) => {
    const reg = /(&nbsp;)/ig
    const xx = $(element).text().replace(reg, '')
    type += xx;
  })

  return type || `未找到${name}对应分类`;
}

async function main() {
  const type = await getLaji('西瓜')
  console.log(type, 'type');
}

main()
