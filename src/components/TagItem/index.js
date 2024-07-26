import './index.css'

const TagItem = props => {
  const {tagDetails, onChangeTagItem, isActive} = props
  const {displayText, optionId} = tagDetails
  const buttonStyle = isActive ? 'active' : ''

  const onClickTagItem = () => {
    onChangeTagItem(optionId)
  }

  return (
    <li className="tag-item">
      <button
        type="button"
        className={`tag-button ${buttonStyle}`}
        onClick={onClickTagItem}
      >
        {displayText}
      </button>
    </li>
  )
}

export default TagItem
