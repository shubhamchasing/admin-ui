import { CiCircleRemove, CiEdit, CiFloppyDisk, CiTrash } from "react-icons/ci";

import Select from "../Select/Select";
import Checkbox from "../Checkbox/Checkbox";
import IconButton from "../IconButton/IconButton";
import { memo } from "react";

const TableRow = ({
  user,
  editCell,
  isSaveDisabled,
  handleSelect,
  handleEdit,
  handleDelete,
  handleCancel,
  handleSave,
  handleOnChange,
  roleOptions,
}) => {
  const isEditableCell = editCell.id === user.id;

  return (
    <tr>
      <td>
        <Checkbox
          id={user.id}
          isSelected={user.isSelected}
          handleSelect={handleSelect}
        />
      </td>

      {!isEditableCell ? (
        <>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.role}</td>
          <td>
            <div className="button-group">
              <IconButton
                className="edit"
                icon={<CiEdit />}
                id={user.id}
                data={user}
                onClick={handleEdit}
              />
              <IconButton
                className="delete"
                icon={<CiTrash />}
                id={user.id}
                onClick={handleDelete}
              />
            </div>
          </td>
        </>
      ) : (
        <>
          <td>
            <input
              type="text"
              name="name"
              value={editCell.data.name}
              onChange={handleOnChange}
              required
            />
            {editCell.errors.name && (
              <span className="error">{editCell.errors.name}</span>
            )}
          </td>
          <td>
            <input
              type="text"
              name="email"
              value={editCell.data.email}
              onChange={handleOnChange}
            />
            {editCell.errors.email && (
              <span className="error">{editCell.errors.email}</span>
            )}
          </td>
          <td>
            <Select
              name="role"
              value={editCell.data.role}
              options={roleOptions}
              onChange={handleOnChange}
            />
          </td>
          <td>
            <div className="button-group">
              <IconButton
                className="save"
                icon={<CiFloppyDisk />}
                isDisabled={isSaveDisabled}
                onClick={handleSave}
              />
              <IconButton
                className="cancel"
                icon={<CiCircleRemove />}
                onClick={handleCancel}
              />
            </div>
          </td>
        </>
      )}
    </tr>
  );
};
const TableRowMemoized = memo(TableRow, (prevProps, nextProps) => {
  // Only re-renders if relevant props change, other props comparison is handled by React's default shallow comparison
  return (
    prevProps.user === nextProps.user && // Check if user prop has remained the same
    prevProps.editCell.id !== prevProps.user.id && // Check if the previously edited cell has changed
    nextProps.editCell.id !== nextProps.user.id // Check if the currently edited cell has changed
  );
});
export default TableRowMemoized;
