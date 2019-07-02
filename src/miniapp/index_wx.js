import { getWindow } from '../utils'
import { more } from '../wxAPI'

let React = getWindow().React = {

}

registerAPIs(React, wx, more);

export default React;
