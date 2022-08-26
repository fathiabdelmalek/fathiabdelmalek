import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendMessage } from "../../actions/contact";

export default function Contact() {
  const dispatch = useDispatch();

  return (
      <div>
        <form>
          <div>
            <label for="email">Email :</label>
            <input type="email" id="email" name="email" />
          </div>
          <div>
            <label for="body">Message :</label>
            <textarea id="body" name="body" />
          </div>
          <div>
            <button type="submit">Send</button>
          </div>
        </form>
      </div>
  )
}
