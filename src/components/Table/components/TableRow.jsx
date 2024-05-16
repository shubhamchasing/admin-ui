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
    <tr className={`${user.isSelected ? "table-selected-row" : ""}`}>
      <td data-label="Checkbox">
        <Checkbox
          id={user.id}
          isSelected={user.isSelected}
          handleSelect={handleSelect}
        />
      </td>

      {!isEditableCell ? (
        <>
          <td data-label="Name">{user.name}</td>
          <td data-label="Email">{user.email}</td>
          <td data-label="Role">{user.role}</td>
          <td data-label="Actions">
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
          <td data-label="Name">
            <div className="input-container">
              <input
                className={`input-table-cell ${
                  editCell.errors.name ? "border-color-red" : ""
                }`}
                type="text"
                name="name"
                value={editCell.data.name}
                onChange={handleOnChange}
                autoFocus
              />
              {editCell.errors.name && (
                <p className="error">{editCell.errors.name}</p>
              )}
            </div>
          </td>
          <td data-label="Email">
            <div className="input-container">
              <input
                className={`input-table-cell ${
                  editCell.errors.email ? "border-color-red" : ""
                }`}
                type="text"
                name="email"
                value={editCell.data.email}
                onChange={handleOnChange}
              />
              {editCell.errors.email && (
                <p className="error">{editCell.errors.email}</p>
              )}
            </div>
          </td>
          <td data-label="Role">
            <div className="input-container">
              <Select
                name="role"
                value={editCell.data.role}
                options={roleOptions}
                onChange={handleOnChange}
              />
            </div>
          </td>
          <td data-label="Actions">
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
