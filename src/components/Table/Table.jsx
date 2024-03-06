import { useState } from "react";

import { CiCircleRemove, CiEdit, CiFloppyDisk, CiTrash } from "react-icons/ci";

import Checkbox from "../Checkbox/Checkbox";
import Select from "../Select/Select";
import IconButton from "../IconButton/IconButton";
import {
  REMOVE_USER,
  SELECT_ALL_USERS,
  SELECT_USER,
  UPDATE_USER,
} from "../Dashboard/utils/userReducer";

import "./style.css";
// error validation
//isAllSelected memoize

const roleOptions = [
  { label: "Member", value: "Member" },
  { label: "Admin", value: "Admin" },
];

const Table = ({ userData, dispatch }) => {
  const [editCell, setEditCell] = useState({
    id: "",
    data: {},
  });

  const isAllSelected =
    userData.length > 0 ? userData.every((user) => user.isSelected) : false;

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
    setEditCell({ id, data });
  };

  const handleCancel = () => {
    setEditCell({
      id: "",
      data: {},
    });
  };

  const handleSave = () => {
    dispatch({
      type: UPDATE_USER,
      payload: {
        data: {
          id: editCell.data.id,
          name: editCell.data.name,
          email: editCell.data.email,
          role: editCell.data.role,
        },
      },
    });
    handleCancel();
  };

  const handleOnChange = (event) => {
    const { value, name } = event.target;
    setEditCell((prevValue) => ({
      ...prevValue,
      data: { ...prevValue.data, [name]: value },
    }));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>
            <Checkbox
              isSelected={isAllSelected}
              handleSelect={handleAllSelect}
            />
          </th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Acions</th>
        </tr>
      </thead>
      <tbody>
        {userData.map((user) => {
          const isEditableCell = editCell.id === user.id;
          return (
            <tr key={user.id}>
              <td>
                <Checkbox
                  id={user.id}
                  isSelected={user.isSelected}
                  handleSelect={handleSelect}
                />
              </td>
              <td>
                {isEditableCell ? (
                  <input
                    type="text"
                    name="name"
                    value={editCell.data.name}
                    onChange={handleOnChange}
                  />
                ) : (
                  <span>{user.name}</span>
                )}
              </td>
              <td>
                {isEditableCell ? (
                  <input
                    type="text"
                    name="email"
                    value={editCell.data.email}
                    onChange={handleOnChange}
                  />
                ) : (
                  <span>{user.email}</span>
                )}
              </td>
              <td>
                {isEditableCell ? (
                  <Select
                    name="role"
                    value={editCell.data.role}
                    options={roleOptions}
                    onChange={handleOnChange}
                  />
                ) : (
                  <span>{user.role}</span>
                )}
              </td>
              <td>
                <div className="button-group">
                  {isEditableCell ? (
                    <>
                      <IconButton
                        className="save"
                        icon={<CiFloppyDisk />}
                        onClick={handleSave}
                      />
                      <IconButton
                        className="cancel"
                        icon={<CiCircleRemove />}
                        onClick={handleCancel}
                      />
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
