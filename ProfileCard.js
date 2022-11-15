import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateAuth } from "../store";
import { Link } from "react-router-dom";

const ProfileCard = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const [url, setURL] = useState(null);

  const [edit, setEdit] = useState(false);
  const editForm = () => {
    setEdit(!edit);
  };

  const [details, setDetails] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    avatar: "",
  });

  useEffect(() => {
    if (auth.id) {
      setDetails({
        ...details,
        username: auth.username,
        firstName: auth.firstName,
        lastName: auth.lastName,
        email: auth.email,
        avatar: auth.avatar,
      });
      if (url) {
        url.addEventListener("change", (ev) => {
          const file = ev.target.files[0];
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.addEventListener("load", () => {
            setDetails({ avatar: reader.result });
          });
        });
      }
    }
  }, [auth]);

  const update = (ev) => {
    ev.preventDefault();
    const saved = {
      ...auth,
      username: details.username,
      firstName: details.firstName,
      lastName: details.lastName,
      email: details.email,
      avatar: details.avatar,
    };

    dispatch(updateAuth(saved), setEdit(!edit));
  };

  const profilePage = (
    <>
      <div className="Profile">
        <div className="userDetails">
          <img src={auth.avatar} alt="Profile Image" />

          <h1>
            {" "}
            {auth.firstName} {auth.lastName}
          </h1>
          <h3> {auth.username} </h3>
          <h6>
            <button className="button-small" onClick={editForm}>
              {" "}
              Edit Profile{" "}
            </button>
          </h6>
          <span className="fa-solid fa-at"> {auth.email} </span>
        </div>

        <table className="directory">
          <h4>Ready? Let's look at the plants again!</h4>
          <tr>
            <Link to="/products" className="fas fa-seedling	">
              <td className="dir1">Plants</td>
            </Link>
            <Link to="/cart" className="fas fa-seedling	">
              <td className="dir1">Your Cart</td>
            </Link>
          </tr>
        </table>
      </div>
    </>
  );

  const editPage = (
    <>
      <div className="editTab">
        <form onSubmit={update} className="editDetails">
          <div>
            <label htmlFor="avatar">
              <img
                src={auth.avatar}
                alt="Profile Image"
                className="profile-avatar"
              />
            </label>{" "}
            <input
              id="avatar"
              name="avatar"
              type="file"
              ref={(element) => setURL(element)}
              style={{ display: "none" }}
            />
          </div>
          <label>Username</label>
          <input
            name="username"
            value={details.username}
            onChange={(ev) =>
              setDetails({ ...details, [ev.target.name]: ev.target.value })
            }
          />
          <label>First Name</label>
          <input
            placeholder=""
            name="firstName"
            value={details.firstName}
            onChange={(ev) =>
              setDetails({ ...details, [ev.target.name]: ev.target.value })
            }
          />
          <label>Last Name</label>
          <input
            name="lastName"
            value={details.lastName}
            onChange={(ev) =>
              setDetails({ ...details, [ev.target.name]: ev.target.value })
            }
          />
          <label>Email</label>
          <input
            name="email"
            value={details.email}
            onChange={(ev) =>
              setDetails({ ...details, [ev.target.name]: ev.target.value })
            }
          />
          <button className="button-small"> Save</button>
        </form>
      </div>
    </>
  );

  return <div>{edit ? editPage : profilePage}</div>;
};
export default ProfileCard;