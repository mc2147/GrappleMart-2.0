import _ from 'lodash'
import React, {Component} from 'react'
import {Navbar} from './components'
import Routes from './routes'
import { Search, Header, Button, Popup, Grid, Label } from 'semantic-ui-react'

const resultRenderer = ({ title }) => <Label content={title} />

resultRenderer.propTypes = {
  title: "Test",
  description: "Test 2",
}

const source = [
  {
    title:"New Title",    
  },
  {
    title:"Abacus",    
  },
  {
    title:"Dave",    
  },
  {
    title:"Matt",    
  },
  {
    title:"Tester",    
}]

class App extends Component {
  constructor() {
    super()
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }
  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })
    
  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })
    let thisValue = this.state.value;
    const isMatch = function(result) {
      if (result.title.toLowerCase().includes(thisValue.toLowerCase())) {
        return true;
      }
      else {
        return false;
      }
    }
    var filteredResults = [];
    source.forEach(elem => {
      var str1 = elem.title.toLowerCase();
      var str2 = value.toLowerCase();
      if (str1.includes(str2)) {
        console.log("str1, str2: ", str1, str2, str1.includes(str2));
        filteredResults.push(elem);
      }
    })
    console.log("filteredResults:", filteredResults);
    this.setState({
      isLoading: false,
      results: filteredResults,
    })
  
    // setTimeout(() => {
    //   if (this.state.value.length < 1) return this.resetComponent()
    //   const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
    //   const isMatch = result => re.test(result.title)
    //   let thisValue = this.state.value;
    //   this.setState({
    //     isLoading: false,
    //     results: _.filter(source, isMatch),
    //   })
    // }, 300)

  }

  render() {
    const { isLoading, value, results } = this.state
    return (
      <div>
        <Navbar />
        <div>
          <Routes />
          <Search
          loading={false}
          onResultSelect={function() { return}}
          onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
          results={results}
          value={value}
          {...this.props}
          />      
          <Button>Click Here</Button>
                <Popup
                trigger={<Button>Show flowing popup</Button>}
                flowing
                hoverable
              >
                <Grid centered divided columns={3}>
                  <Grid.Column textAlign='center'>
                    <Header as='h4'>Basic Plan</Header>
                    <p><b>2</b> projects, $10 a month</p>
                    <Button color="green">Choose</Button>
                  </Grid.Column>
                  <Grid.Column textAlign='center'>
                    <Header as='h4'>Business Plan</Header>
                    <p><b>5</b> projects, $20 a month</p>
                    <Button color="blue">Choose</Button>
                  </Grid.Column>
                  <Grid.Column textAlign='center'>
                    <Header as='h4'>Premium Plan</Header>
                    <p><b>8</b> projects, $25 a month</p>
                    <Button color="red">Choose</Button>
                  </Grid.Column>
                </Grid>
              </Popup>      
        </div>
      </div>
    )
  }
}

export default App
