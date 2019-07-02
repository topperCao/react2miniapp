const React = require('react')

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'jyf'
    }
  }

  componentDidMount() {
    console.log('did');
    
    setTimeout(() => {
      this.setState({
        name: 'xxx'
      }, () => {
        console.log('finish')
      })
    }, 2000)
  }

  render() {
    var h = React.createElement;
    return h('view', {
      class: 'test_class'
    }, h('text', {
      class: 'child'
    }, 'text'));
  }
}

module.exports = Test;
