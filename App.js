import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form'
import TodoItemList from './components/TodoItemList';

class App extends Component {

  id = 3

  state = {
    input : '',
    todos: [
      { id:0, text:'리액트 너 참 이쁜 아이구나', checked: false },
      { id:1, text:'이건 처음에 App에 있다가', checked: true},
      { id:2, text:'App이 ItemList에 전해주는구나', checked: false}
    ]
  }

  handleRemove = (id) => {
    const{todos} = this.state;
    this.setState({
      todos: todos.filter(todo => todo.id !== id)
    });
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value
    });
  }

  handleCreate = () => {
    const { input, todos} = this.state;
    this.setState({
      input: '',
      todos: todos.concat({
        id: this.id++,
        text: input,
        checked: false
      })
    });
  }

  handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      this.handleCreate();
    }
  }

  handleToggle = (id) => {
    const {todos} = this.state;

    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index];
    const nextTodos = [...todos];

    nextTodos[index] = {
      ...selected,
      checked: !selected.checked
    };

    this.setState({
      todos: nextTodos
    });
  }

  render() {
    const {input, todos} = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove
    } = this; // 이렇게 미리 비구조화 할당을 함으로써 추가적인 this.를 계속 붙일 필요 X
    return (
      <div>
         <TodoListTemplate form = {<Form value={input} onKeyPress={handleKeyPress} onChange={this.handleChange} onCreate={this.handleCreate} />
        }>
           <TodoItemList todos = {todos} onToggle={handleToggle} onRemove={handleRemove}/>
           </TodoListTemplate>
      </div>
    );
  }
}

export default App;
