import React from 'react';
import './App.css';
import TodoItem from './components/TodoItem';
import tick from './img/tick.svg';


class App extends React.Component {
  constructor(){
    super();
    this.state = {
      todoItems:[
      { title: 'Buy bim bim', isComplete: true},
      { title: 'Play footbal', isComplete: true},
      { title: 'Go out with friends'}
    ]
  }
  this.onKeyUp = this.onKeyUp.bind(this);
  this.onChange = this.onChange.bind(this);
  }

  onKeyUp(event){
    let text = event.target.value;
    if (event.keyCode === 13)
    {
    if (!text){
      return;
    }
    text = text.trim();
    if (!text) { return; }

    this.setState({
      newItem: '',
      todoItems: [
        { title: text, isComplete: false },
        ...this.state.todoItems
      ]
    });
    } 
  }

  onItemClicked(item){
    console.log(item);
    return (event) => {
      const isComplete =item.isComplete;
      const { todoItems } = this.state;
      const index = todoItems.indexOf(item);
      this.setState({
        todoItems: [
          ...todoItems.slice(0, index),
          {
            ...item,
            isComplete: !isComplete
          },
          ...todoItems.slice(index + 1)
        ]
      });
    };
  }
  onChange(event) {
    this.setState({
      newItem: event.target.value
    });
  }
  render(){
    const { todoItems, newItem } = this.state;
      return(
        <div className="App">
          <div className="Header">
            <img src={tick} width={32} height={32} />
            <input 
              type="text" 
              value ={ newItem } 
              onChange = { this.onChange }
              placeholder="Add a new item" 
              onKeyUp = {this.onKeyUp} />
          </div>
            {
              todoItems.length > 0 && todoItems.map((item,index) => 
              <TodoItem 
                key = {index} 
                item= {item} 
                onClick={this.onItemClicked(item)} 
              />)
            }
            {
              todoItems.length === 0 && 'Nothing here.'
            }
        </div>
      );
  }
}

export default App;
