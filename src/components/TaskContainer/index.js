import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import TagItem from '../TagItem'
import TaskItem from '../TaskItem'

import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class TaskContainer extends Component {
  state = {
    taskInput: '',
    tagInput: tagsList[0].optionId,
    taskList: [],
    activeTagId: '',
  }

  onChangeTask = event => {
    this.setState({taskInput: event.target.value})
  }

  onChangeTagInput = event => {
    this.setState({tagInput: event.target.value})
  }

  onChangeTagItem = option => {
    this.setState({activeTagId: option})
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {taskInput, tagInput} = this.state
    const newTag = {
      id: uuidv4(),
      taskInput,
      tagInput,
    }
    if (taskInput.length !== 0) {
      this.setState(prevState => ({
        taskList: [...prevState.taskList, newTag],
        taskInput: '',
        tagInput: tagsList[0].optionId,
      }))
    }
  }

  renderTask = () => {
    const {taskInput} = this.state
    return (
      <>
        <label htmlFor="task" className="label-element">
          Task
        </label>
        <input
          type="text"
          id="task"
          value={taskInput}
          className="input-element"
          placeholder="Enter the task here"
          onChange={this.onChangeTask}
        />
      </>
    )
  }

  renderTags = () => {
    const {tagInput} = this.state
    return (
      <>
        <label htmlFor="tags" className="label-element">
          Tags
        </label>
        <select
          id="tags"
          value={tagInput}
          onChange={this.onChangeTagInput}
          className="input-element"
        >
          {tagsList.map(eachTag => (
            <option key={eachTag.optionId} value={eachTag.optionId}>
              {eachTag.displayText}
            </option>
          ))}
        </select>
      </>
    )
  }

  getFilterTasksList = () => {
    const {taskList, activeTagId} = this.state
    if (activeTagId === '') {
      return taskList
    }
    return taskList.filter(task => task.tagInput === activeTagId)
  }

  render() {
    const {activeTagId} = this.state
    const filterTaskList = this.getFilterTasksList()
    const taskListLength = filterTaskList.length === 0

    return (
      <div className="task-container">
        <div className="create-container">
          <h1 className="create-heading">Create a task!</h1>
          <form className="form-container" onSubmit={this.onSubmitForm}>
            {this.renderTask()}
            {this.renderTags()}
            <button type="submit" className="add-button">
              Add Task
            </button>
          </form>
        </div>
        <div className="tags-task-container">
          <h1 className="tags-heading">Tags</h1>
          <ul className="tags-list">
            {tagsList.map(eachTag => (
              <TagItem
                tagDetails={eachTag}
                key={eachTag.optionId}
                isActive={eachTag.optionId === activeTagId}
                onChangeTagItem={this.onChangeTagItem}
              />
            ))}
          </ul>
          <h1 className="task-heading">Tasks</h1>
          {taskListLength ? (
            <p className="no-tags">No Tasks Added Yet</p>
          ) : (
            <ul className="task-list">
              {filterTaskList.map(eachTask => (
                <TaskItem taskDetails={eachTask} key={eachTask.id} />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default TaskContainer
