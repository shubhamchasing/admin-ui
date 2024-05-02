import { memo } from "react";

import {
  RiCloseLine,
  RiDeleteBin7Line,
  RiEditLine,
  RiSaveLine,
} from "react-icons/ri";

import Select from "../Select/Select";
import Checkbox from "../Checkbox/Checkbox";
import IconButton from "../IconButton/IconButton";

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
    <tr className={`${user.isSelected ? "table-selected-row" : ""}`}>
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
                className="edit-icon-btn"
                icon={<RiEditLine />}
                id={user.id}
                data={user}
                onClick={handleEdit}
              />
              <IconButton
                className="delete-icon-btn"
                icon={<RiDeleteBin7Line />}
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
              className={`input-table-cell ${editCell.errors.name ? "border-color-red" : ""}`} 
              type="text"
              name="name"
              value={editCell.data.name}
              onChange={handleOnChange}
              autoFocus
            />
            {editCell.errors.name && (
              <p className="error">{editCell.errors.name}</p>
            )}
          </td>
          <td>
            <input
              className={`input-table-cell ${editCell.errors.email ? "border-color-red" : ""}`} 
              type="text"
              name="email"
              value={editCell.data.email}
              onChange={handleOnChange}
            />
            {editCell.errors.email && (
              <p className="error">{editCell.errors.email}</p>
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
                className="save-icon-btn"
                icon={<RiSaveLine />}
                isDisabled={isSaveDisabled}
                onClick={handleSave}
              />
              <IconButton
                className="cancel-icon-btn"
                icon={<RiCloseLine />}
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
