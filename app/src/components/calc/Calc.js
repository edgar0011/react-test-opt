/**
 * Created by edgar on 11/01/2017.
 */
import React from 'react';
import { Button } from 'reactstrap';

import { connect } from 'react-redux';

import BasicInput from '../ui/BasicInput';

import * as addTodoActions from '../../actions/todoActions';

import {TODOS} from '../../styles/basic';


@connect((store)=> {
  return {
    todos: store.todos
  }
}, {addTodo: addTodoActions.addTodo, removeTodo: addTodoActions.removeTodo})
export default class Calc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emphasized:false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleAddTodo = this.handleAddTodo.bind(this);
    this.handleRemoveTodo = this.handleRemoveTodo.bind(this);

    this.onChangeHandler = this.onChangeHandler.bind(this);

    this.formatters = [(value, prevValue) => {
      if (isNaN(Number(value))) {
        value = prevValue;
      }
      if (isNaN(Number(value)) || Number(value) < 0) {
        value = prevValue;
      }

      const val2Str = parseInt(value.toString());
      return !!value ? (isNaN(val2Str) ? '' : val2Str) : '';
    }]
  }

  handleClick(event) {
    this.setState({emphasized:!this.state.emphasized});
  }

  handleAddTodo() {
    this.props.addTodo(this.textBasicInput.state.value);
    this.textBasicInput.reset();
    this.setState({textBasicInputValue: null });

  }
  handleRemoveTodo(index) {
    const {todos} = this.props.todos;
    this.props.removeTodo(todos[index].id);
  }


  onChangeHandler(basicInputState) {
      this.setState({textBasicInputValue: this.textBasicInput.state.value });
  }

  render() {
    const title = 'Todo';
    const todoStyle = TODOS.TODO.TEXT;

    const todos = this.props.todos.todos.map((todo, index) => {
      return (
        <li class="list-group-item" key={'todo' + index}>
          <span class="float-left" style={todoStyle}>{todo.todo}</span>
          <span class=" float-right">
            <span class="fa fa-remove"
                  style={{color:'#666', fontSize: '120%', cursor:'pointer'}}
                  onClick={this.handleRemoveTodo.bind(this, index)}>

            </span>
          </span>
        </li>
      )
    });

    const disabledAdd = this.textBasicInput ? !this.textBasicInput.state.value : false;

    return (
      <div>
        <h3>{title}</h3>
        <div>
          <BasicInput ref={(input) => { this.textBasicInput = input; }}
                      onChangeHandler={this.onChangeHandler}
                      changeBounce="100" value="Karel 1"
                      formatters={this.formatters}

          />
        </div>
        <Button color="primary" onClick={this.handleAddTodo} disabled={!this.state.textBasicInputValue}>ADD TODO</Button>
        {todos && todos.length>0 && <ul class="list-group col-4">{todos}</ul>}
      </div>
    )
  }
}