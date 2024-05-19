import { memo } from "react";

import {
  RiCloseLine,
  RiDeleteBin7Line,
  RiEditLine,
  RiSaveLine,
} from "react-icons/ri";

import Select from "../../Select";
import Checkbox from "../../Checkbox";
import IconButton from "../../IconButton";

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
    <tr className={user.isSelected ? "table-selected-row" : ""}>
      <td data-label="Checkbox">
        <Checkbox
          id={user.id}
          checked={user.isSelected}
          onChange={handleSelect}
        />
      </td>
      <td data-label="Name">
        {isEditableCell ? (
          <div className="table-cell-container ">
            <input
              className={`table-input-box ${
                editCell.errors.name ? "border-color-red" : ""
              }`}
              type="text"
              name="name"
              value={editCell.data.name}
              onChange={handleOnChange}
              autoFocus
            />
            {editCell.errors.name && (
              <p className="input-error">{editCell.errors.name}</p>
            )}
          </div>
        ) : (
          <div className="truncate">{user.name}</div>
        )}
      </td>
      <td data-label="Email">
        {isEditableCell ? (
          <div className="table-cell-container">
            <input
              className={`table-input-box ${
                editCell.errors.email ? "border-color-red" : ""
              }`}
              type="text"
              name="email"
              value={editCell.data.email}
              onChange={handleOnChange}
            />
            {editCell.errors.email && (
              <p className="input-error">{editCell.errors.email}</p>
            )}
          </div>
        ) : (
          <div className="truncate">{user.email}</div>
        )}
      </td>
      <td data-label="Role">
        {isEditableCell ? (
          <div className="table-cell-container">
            <Select
              name="role"
              value={editCell.data.role}
              options={roleOptions}
              onChange={handleOnChange}
              className="table-dropdown"
            />
          </div>
        ) : (
          <div className="truncate">{user.role}</div>
        )}
      </td>
      <td data-label="Actions">
        <div className="action-button-group">
          {isEditableCell ? (
            <>
              <IconButton
                className="save"
                icon={<RiSaveLine />}
                disabled={isSaveDisabled}
                onClick={handleSave}
              />
              <IconButton
                className="cancel"
                icon={<RiCloseLine />}
                onClick={handleCancel}
              />
            </>
          ) : (
            <>
              <IconButton
                className="edit"
                icon={<RiEditLine />}
                id={user.id}
                data={user}
                onClick={handleEdit}
              />
              <IconButton
                className="delete"
                icon={<RiDeleteBin7Line />}
                id={user.id}
                onClick={handleDelete}
              />
            </>
          )}
        </div>
      </td>
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
