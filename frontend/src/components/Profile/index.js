import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../actions/profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faPhone } from "@fortawesome/free-solid-svg-icons";

export default function Profile() {
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <div className="profile-container">
      <section className="image-container">
        <a href={profile.payload.image} target="_blank" rel="noreferrer">
          <img src={profile.payload.image} alt={profile.payload.name} />
        </a>
      </section>
      <section className="info-container">
        <h2 className="name">
          Hi, I 'm {profile.loading ? "Loading" : profile.payload.name}
        </h2>
        <h3 className="job">
          {" "}
          {profile.loading ? "Loading" : profile.payload.job_title}{" "}
        </h3>
        <p className="email">
          <b>
            <FontAwesomeIcon icon={faAt} /> :
          </b>
          {profile.loading ? "Loading" : profile.payload.email}
        </p>
        <p className="phone">
          <b>
            <FontAwesomeIcon icon={faPhone} /> :
          </b>
          {profile.loading ? "Loading" : profile.payload.phone}
        </p>
      </section>
    </div>
  );
}
