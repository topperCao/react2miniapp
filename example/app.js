const React = require('react')
const Test = require('./componet')

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '1231'
    }
  }

  componentDidMount() {
    console.log('did app');

    setTimeout(() => {
      this.setState({
        name: 'sadf'
      }, () => {
        console.log('finish app')
      })
    }, 5000)
  }

  render() {
    var h = React.createElement;
    return h('view', {
      class: 'test_class'
    }, h('text', {
      class: 'child'
    }, h(Test)));
  }
}

module.exports = App;
