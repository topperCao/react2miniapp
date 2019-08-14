import React from 'react'
import { registerPage } from '../../utils/registerPage.wx'

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'jyf'
    }
  }

  onLoad() {
    wx.cloud.init();
  }

  componentDidMount() {
    console.log('did com');
    setTimeout(() => {
      this.setState({
        name: 'xhq'
      }, () => {
        console.log('finish com')
      })
    }, 3000)
  }

  render() {
    var h = React.createElement;
    const { name } = this.state;
    return h('view', {
      class: 'parent'
    }, h('text', {
      class: 'child'
    }, name));
  }
}

Page(registerPage(Test, "pages/test/index"));

export default Test;
