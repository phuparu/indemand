import React, { useState, useContext } from "react";
import { authContext } from "../../context/authController";
import Modal from "../../context/Modal";

const SidePanel1 = () => {
  const { user } = useContext(authContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    if (!user) {
      setIsModalOpen(true);
    } else {
      // Handle the booking process
    }
  };

  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text__para mt-0 font-semibold">ราคา</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
          999 บาท
        </span>
      </div>

      <div className="mt-[30px]">
        <p className="text__para mt-0 font-semibold text-headingColor">
          เวลาที่สามารถจองเรียนได้
        </p>

        <ul className="mt-3">
          <li className="flex items-center justify-between mb-2">
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              วันเสาร์
            </p>
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              8:30 น. - 18:30 น.
            </p>
          </li>
          <li className="flex items-center justify-between mb-2">
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              วันอาทิตย์
            </p>
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              8:30 น. - 18:30 น.
            </p>
          </li>
        </ul>
      </div>

      <button
        onClick={handleButtonClick}
        className="btn px-2 w-full rounded-md hover:bg-yellow-400 transition duration-500 ease-in-out"
      >
        จองเวลา
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p>คุณต้องเข้าสู่ระบบก่อนที่จะจองเวลา</p>
      </Modal>
    </div>
  );
};

export default SidePanel1;
