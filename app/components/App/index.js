import React, { Component } from 'react';
import PropTypes from 'prop-types';

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData('text', ev.target.id);
}

function drop(ev) {
  if (ev.target.id.startsWith('board-column-')) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData('text');
    ev.target.appendChild(document.getElementById(data));
  }
}

const Task = ({ id, name }) => (
  <div
    className="board-task"
    id={id}
    draggable="true"
    onDragStart={drag}
  >
    <h4>{name}</h4>
  </div>
);

Task.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const addTask = (columnId, onNewTask) => {
  return () => {
    const id = Math.floor(Math.random() * 10000).toString();
    onNewTask(columnId, id, `Task ${id}`);
  };
};

const Column = ({ id, name, tasks, onNewTask }) => (
  <div
    className="board-column"
  >
    <h3>{name}<button onClick={addTask(id, onNewTask)}>+</button></h3>
    <div
      className="board-column-tasks"
      id={`board-column-${id}`}
      onDrop={drop}
      onDragOver={allowDrop}
    >
      {
        tasks.map(task => (
          <Task
            key={task.id}
            id={task.id}
            name={task.name}
          />
        ))
      }
    </div>
  </div>
);

Column.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
  onNewTask: PropTypes.func.isRequired,
};

const addColumn = (onNewColumn) => {
  return () => {
    const id = Math.floor(Math.random() * 10000).toString();
    onNewColumn(id, `Colum ${id}`);
  };
};

const Board = ({ columns, onNewColumn, onNewTask }) => (
  <div className="board">
    {
      columns.map(column => (
        <Column
          key={column.id}
          name={column.name}
          id={column.id}
          tasks={column.tasks}
          onNewTask={onNewTask}
        />
      ))
    }
    <button onClick={addColumn(onNewColumn)}>+</button>
  </div>
);

Board.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })).isRequired,
  onNewColumn: PropTypes.func.isRequired,
  onNewTask: PropTypes.func.isRequired,
};

class App extends Component {
  state = {
    columns: [
      {
        id: 'col-1',
        name: 'To Do',
        tasks: [
          {
            id: 'task-1-1',
            name: 'Create...',
          },
          {
            id: 'task-1-2',
            name: 'Develope...',
          },
        ],
      },
      {
        id: 'col-2',
        name: 'In Progress',
        tasks: [
          {
            id: 'task-2-1',
            name: 'Analysis',
          },
        ],
      },
      {
        id: 'col-3',
        name: 'Done',
        tasks: [
          {
            id: 'task-3-1',
            name: 'Factibility',
          },
        ],
      },
    ],
  }

  onNewColumn = (id, name) => {
    this.setState(prevState => ({
      columns: [
        ...prevState.columns,
        {
          id,
          name,
          tasks: [],
        },
      ],
    }));
  }

  onNewTask = (columnId, id, name) => {
    this.setState((prevState) => {
      const newState = { ...prevState };
      const column = newState.columns.find(col => col.id === columnId);

      if (column) {
        column.tasks.push({
          id,
          name,
        });
      }

      return newState;
    });
  }

  render() {
    return (
      <div className="app">
        <h2 className="app__header">Kanban board</h2>
        <Board
          columns={this.state.columns}
          onNewColumn={this.onNewColumn}
          onNewTask={this.onNewTask}
        />
      </div>
    );
  }
}

export default App;
