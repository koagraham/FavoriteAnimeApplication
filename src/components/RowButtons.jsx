//main anim entry row buttons component
export default function RowButtons({ isEditing, onEditClick, onSaveClick, onDeleteClick }) {
    return isEditing ? (
        <td>
          <button onClick={onSaveClick}>Save</button>
        </td>
      ) : (
        <td>
          <button onClick={onDeleteClick}>Remove</button>
          <button onClick={onEditClick}>Edit</button>
        </td>
      )
}