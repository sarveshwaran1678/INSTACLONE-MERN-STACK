import React from "react";
//import user from "../../Images/mayank.jpg";
import post from "../../Images/mayankPost.jpg";
import { ToastContainer, toast } from "react-toastify";

function StoryModal() {
  const ShowModal = () => (
    <div class="d-none d-md-block">
      <img
        class="d-block w-100"
        src={post}
        alt="First slide"
        data-dismiss="modal"
      />
    </div>
  );

  const notify = () => {
    toast(<ShowModal />);
  };

  return (
    <div>
      <ToastContainer limit={1} position="top-center" autoClose={10000} />
      {notify()}
    </div>
  );
}

export default StoryModal;
