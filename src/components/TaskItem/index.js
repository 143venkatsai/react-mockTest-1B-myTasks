import './index.css'

const TaskItem = props => {
  const {taskDetails} = props
  const {taskInput, tagInput} = taskDetails

  return (
    <li className="task-item">
      <p className="task-name">{taskInput}</p>
      <p className="tag-name">{tagInput}</p>
    </li>
  )
}

export default TaskItem
