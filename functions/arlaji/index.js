// 云函数入口文件
const cloud = require('wx-server-sdk')
const axios = require('axios')
const qs = require('querystring')
const crypto = require('crypto');
const url = require('url');

const { ak_id, ak_secret } = require('./secrect_config')

cloud.init()

function request({ url, params, data, method, isSpider = false, headers }) {
  return axios({
    method: method || 'get',
    url,
    data,
    params,
    headers,
    transformResponse: [function (data) {
      return JSON.parse(data);
    }],
  });
}

async function getAR(query) {
  // console.log(query, 'query')
  const date = new Date().toUTCString()

  let options = {
    url : 'https://dtplus-cn-shanghai.data.aliyuncs.com/image/tag',
    method: 'POST',
    data: JSON.stringify(query),
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'date': date,
      'Authorization': ''
    }
  };

  const md5 = function(buffer) {
    let hash;
    hash = crypto.createHash('md5');
    hash.update(buffer);
    return hash.digest('base64');
  };
  const sha1 = function(stringToSign, secret) {
    return crypto.createHmac('sha1', secret).update(stringToSign).digest().toString('base64');
  };

  let body = options.data || '';
  let bodymd5;
  if(body === void 0 || body === ''){
    bodymd5 = body;
  } else {
    bodymd5 = md5(Buffer.from(body));
  }

  let stringToSign = options.method + "\n" + options.headers.accept + "\n" + bodymd5 + "\n" + options.headers['content-type'] + "\n" + options.headers.date + "\n" + url.parse(options.url).path;

  var signature = sha1(stringToSign, ak_secret);
  let authHeader = "Dataplus " + ak_id + ":" + signature;
  console.log('authHeader----- ', authHeader)
  options.headers.Authorization = authHeader;

  try {
    const { data: data2 } = await request(options)
    const { tags } = data2;
    return tags;
  } catch (error) {
    console.log('error', 'err')
    return [];
  }
}

// getAR({
//   type: 1,
//   content: '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'})
// getAR({
//   type: 0,
//   image_url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2112019757,1936267081&fm=27&gp=0.jpg'
// })

exports.main = async (event, context) => {
  const { image } = event;
  try {
    const tags = await getAR({
      type: 1,
      content: image,
    })
    return {
      results: tags
    }
  } catch (error) {
    return {
      results: []
    };
  }
}
