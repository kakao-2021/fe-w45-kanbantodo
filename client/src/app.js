/*
    app.js
    <entry point>
*/
import ListView from '../views/ListView.js';
import TodoModel from '../models/TodoModel.js';
import * as _dom from './util.js';
import InputView from '../views/InputView.js';
import ModalView from '../views/ModalView.js';

// model, Subject
const todoModel = new TodoModel('http://localhost:5000/posts');

//debugger;

// Observer
const listview = new ListView(todoModel);
listview.init();

const inputview = new InputView(todoModel);
inputview.init();

const modalview = new ModalView(todoModel);
modalview.init();