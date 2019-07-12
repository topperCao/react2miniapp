
import { get } from '../services/base'
import cheerio from 'cheerio'

export default async function getLaji(name) {
  const { data } = await get({
    path: `https://lajifenleiapp.com/sk/西瓜`,
    // path: 'https://www.baidu.com/search/error.html',
    // path: 'https://www.jianshu.com/p/3112a56fb4a2',
    query: {},
    header: {
      // 'content-type': 'text/html; charset=utf-8',
    },
    options: {
      // dataType: '其他',
    }
  })
  console.log(data , 'data pachong');
  let type = '';

  const $ = cheerio.load(data, {
    xml: {
      normalizeWhitespace: true,
      withDomLvl1: true,
      xmlMode: true,
      decodeEntities: false
    }
  })

  $('.container .row').eq(2).find('.col-md-12 h1 span').each((index, element) => {
    const reg = /(&nbsp;)/ig
    const xx = $(element).text().replace(reg, '')
    type += xx;
  })

  return type || `未找到${name}对应分类`;
}

