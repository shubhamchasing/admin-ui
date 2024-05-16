import { useMemo, useState } from "react";

import TableRowMemoized from "./components/TableRow";
import Checkbox from "../Checkbox";
import { validateData } from "../../utils/validateData";
import {
  REMOVE_USER,
  SELECT_ALL_USERS,
  SELECT_USER,
  UPDATE_USER,
} from "../Dashboard/utils/userReducer";

import "./style.css";

const roleOptions = [
  { label: "Member", value: "member" },
  { label: "Admin", value: "admin" },
];

const initialState = {
  id: "",
  data: {},
  errors: {},
};

const Table = ({ userData, dispatch }) => {
  const [editCell, setEditCell] = useState(initialState);

  const userSelectionInfo = useMemo(() => {
    if (userData.length > 0) {
      const isAllSelected = userData.every((user) => user.isSelected);
      const someSelected = userData.some((user) => user.isSelected);
      const isIndeterminate = someSelected && !isAllSelected;

      return { isAllSelected, isIndeterminate };
    } else {
      return { isAllSelected: false, isIndeterminate: false };
    }
  }, [userData]);

  const { isAllSelected, isIndeterminate } = userSelectionInfo;

  const isSaveDisabled = (() => {
    const errorValueArray = Object.values(editCell.errors);
    if (errorValueArray.length === 0) return true;
    return errorValueArray.some((error) => !!error);
  })();

  const handleSelect = (isSelected, id) => {
    dispatch({
      type: SELECT_USER,
      payload: { id, isSelected },
    });
  };

  const handleAllSelect = (isAllSelected) => {
    dispatch({
      type: SELECT_ALL_USERS,
      payload: { isAllSelected },
    });
  };

  const handleDelete = (id) => {
    dispatch({
      type: REMOVE_USER,
      payload: { id },
    });
  };

  const handleEdit = (id, data) => {
    const editableData = Object.keys(data).reduce((acc, key) => {
      if (key !== "isSelected") {
        acc[key] = data[key];
      }
      return acc;
    }, {});
    setEditCell({ ...initialState, id, data: editableData });
  };

  const handleCancel = () => {
    setEditCell(initialState);
  };

  const handleSave = () => {
    dispatch({
      type: UPDATE_USER,
      payload: {
        data: editCell.data,
      },
    });
    setEditCell(initialState);
  };

  const handleOnChange = (event) => {
    const { value, name } = event.target;
    const errorMessage = validateData(name, value);
    setEditCell((prevEditCell) => ({
      ...prevEditCell,
      data: {
        ...prevEditCell.data,
        [name]: value,
      },
      errors: {
        ...prevEditCell.errors,
        [name]: errorMessage,
      },
    }));
  };

  return (
    <table>
      <thead>
        <tr>
          <th data-label="Master Checkbox">
            <Checkbox
              isSelected={isAllSelected}
              handleSelect={handleAllSelect}
              indeterminate={isIndeterminate}
            />
          </th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {userData.map((user) => (
          <TableRowMemoized
            key={user.id}
            user={user}
            editCell={editCell}
            isSaveDisabled={isSaveDisabled}
            handleSelect={handleSelect}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleCancel={handleCancel}
            handleSave={handleSave}
            handleOnChange={handleOnChange}
            roleOptions={roleOptions}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
