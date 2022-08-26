import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../actions/profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faPhone } from "@fortawesome/free-solid-svg-icons";

export default function Profile() {
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, []);

  return (
    <div>
      <section>
        <a href={profile.payload.image} target="_blank" rel="noreferrer">
          <img
            src={profile.payload.image}
            alt={profile.payload.full_name}
            width="200px"
            height="200px"
          />{" "}
        </a>{" "}
      </section>{" "}
      <section>
        <h2>
          Hi, I 'm {profile.loading ? "Loading" : profile.payload.full_name}{" "}
        </h2>{" "}
        <h3> {profile.loading ? "Loading" : profile.payload.job_title} </h3>{" "}
        <p>
          <b>
            <FontAwesomeIcon icon={faAt} /> :{" "}
          </b>{" "}
          {profile.loading ? "Loading" : profile.payload.email}{" "}
        </p>{" "}
        <p>
          <b>
            <FontAwesomeIcon icon={faPhone} /> :{" "}
          </b>{" "}
          {profile.loading ? "Loading" : profile.payload.phone}{" "}
        </p>{" "}
      </section>{" "}
    </div>
  );
}
