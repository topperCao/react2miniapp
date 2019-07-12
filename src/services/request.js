
function checkStatus(response) {
  if (response.statusCode >= 200 && response.statusCode < 300) return response

  const error = new Error(response.errMsg)
  error.response = response
  throw error
}

export default function request(url, options) {
  return fetch(
    url,
    options
  )
  .then(checkStatus)
}


function fetch(url, options) {
  return new Promise((resolve, reject) => {
    console.log(options, 'options')
    wx.request({
      url,
      ...options,
      success (res) {
        console.log(res, 'success')
        resolve(res);
      },
      fail(error) {
        console.log(error, 'error')
        reject(error);
      }
    })
  })
}