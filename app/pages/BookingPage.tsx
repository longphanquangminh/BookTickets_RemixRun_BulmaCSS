import { useState } from "react";
import "../assets/video27_dat_ve_phim/BaiTapBookingTicket.css";
import "./BookingPage.css";
import danhSachGhe from "../assets/video27_dat_ve_phim/danhSachGhe.json";
import type { danhSachGheType } from "~/types/danhSachGheType";
import type { hangVaDanhSachType } from "~/types/hangVaDanhSachType";

export default function BookingPage() {
  const [customerName, setCustomerName] = useState<string>("");
  const [numberOfSeats, setNumberOfSeats] = useState<number>(0);
  const [openToSelect, setOpenToSelect] = useState<boolean>(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);
  const handleCheckboxChange = (label: string) => {
    if (selectedCheckboxes.includes(label)) {
      setSelectedCheckboxes(selectedCheckboxes.filter(item => item !== label));
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, label]);
    }
  };
  const handleSelect = () => {
    if (customerName == "" || numberOfSeats <= 0) {
      alert("Tên ko để trống và số ghế >= 1 bạn iu nhé! Nhắc thế thôi");
      setOpenToSelect(false);
    } else {
      setOpenToSelect(true);
    }
  };
  const [confirmSelection, setConfirmSelection] = useState<boolean>(false);
  const handleConfirm = () => {
    if (numberOfSeats === selectedCheckboxes.length) {
      setConfirmSelection(true);
      setOpenToSelect(false);
    } else {
      alert(`Vui lòng book vừa đủ ${numberOfSeats} ghế`);
    }
  };
  return (
    <section id='booking-background' className='hero is-fullheight is-relative'>
      <div id='our-overlay' className='hero is-fullheight has-background-black'></div>
      <div className='py-6 is-relative has-text-white has-text-centered container'>
        <h1 className='content is-large'>MOVIE SEAT SELECTION</h1>
        <div className='my-6 p-3 has-background-dark has-text-white has-text-left'>
          <p className='has-text-warning mb-3'>Fill The Required Details Below And Select Your Seats</p>
          <div className='field is-horizontal'>
            <div className='field-label is-normal'>
              <label className='label has-text-white'>Name</label>
            </div>
            <div className='field-body'>
              <div className='field'>
                <p className='control'>
                  <input
                    disabled={openToSelect || confirmSelection}
                    readOnly={openToSelect || confirmSelection}
                    className='input'
                    type='text'
                    placeholder='Name'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomerName(e.target.value)}
                  />
                </p>
              </div>
            </div>
          </div>
          <div className='field is-horizontal'>
            <div className='field-label is-normal'>
              <label className='label has-text-white'>Seats</label>
            </div>
            <div className='field-body'>
              <div className='field'>
                <p className='control'>
                  <input
                    disabled={openToSelect || confirmSelection}
                    readOnly={openToSelect || confirmSelection}
                    className='input'
                    type='number'
                    min='1'
                    placeholder='Number of Seats'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNumberOfSeats(parseInt(e.target.value))}
                  />
                </p>
              </div>
            </div>
          </div>
          <div className='is-flex is-justify-content-center'>
            <button className='button is-link is-rounded' onClick={handleSelect} disabled={openToSelect || confirmSelection}>
              Start selecting
            </button>
          </div>
          <div className='columns my-6 mx-auto'>
            <div className='column'>
              <div className='columns'>
                <div className='column gheDangChon'></div>
                <div className='column'>Selected Seat</div>
              </div>
            </div>
            <div className='column'>
              <div className='columns'>
                <div className='column gheDuocChon'></div>
                <div className='column'>Reserved Seat</div>
              </div>
            </div>
            <div className='column'>
              <div className='columns'>
                <div className='column gheTrong'></div>
                <div className='column'>Empty Seat</div>
              </div>
            </div>
          </div>
          {openToSelect && <div className='my-3 has-text-black content has-background-warning has-text-centered'>Please Select your Seats NOW!</div>}
          <div className='table-container'>
            <table cellSpacing='0' cellPadding='0' id='seatsBlock' className='table mx-auto'>
              <thead>
                <tr>
                  <th>{danhSachGhe[0].hang}</th>
                  {danhSachGhe[0].danhSachGhe.map((item: danhSachGheType, index: number) => (
                    <th key={`head-${index}`}>{item.soGhe}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {danhSachGhe.slice(1).map((item: hangVaDanhSachType, index: number) => (
                  <tr key={`item-${index}`}>
                    <td>{item.hang}</td>
                    {item.danhSachGhe.map((itemGhe: danhSachGheType, indexChild: number) => (
                      <td key={`itemGhe-${indexChild}`}>
                        <label
                          className={`is-inline-block seats ${itemGhe.daDat || itemGhe.gia <= 0 ? "has-background-danger" : ""} ${
                            selectedCheckboxes.includes(itemGhe.soGhe) ? "has-background-success" : ""
                          }`}
                          htmlFor={`itemDatGhe-${itemGhe.soGhe}`}
                        ></label>
                        <input
                          id={`itemDatGhe-${itemGhe.soGhe}`}
                          checked={selectedCheckboxes.includes(itemGhe.soGhe)}
                          onChange={() => handleCheckboxChange(itemGhe.soGhe)}
                          type='checkbox'
                          className='is-hidden'
                          value={itemGhe.soGhe}
                          disabled={openToSelect == false || itemGhe.daDat || itemGhe.gia <= 0}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='my-3 has-text-black content is-large p-3 has-background-warning has-text-centered'>SCREEN THIS WAY</div>
          <div className='is-flex is-justify-content-center'>
            <button disabled={!openToSelect} className='button is-link is-rounded' onClick={handleConfirm}>
              Confirm selection
            </button>
          </div>
          <div className='table-container mt-3'>
            <table className='table is-bordered is-striped is-narrow is-hoverable is-fullwidth'>
              <thead>
                <tr>
                  <th className='has-text-centered'>Name</th>
                  <th className='has-text-centered'>Number of Seats</th>
                  <th className='has-text-centered'>Seats</th>
                </tr>
              </thead>
              <tbody id='tbodyCustomerSeats'>
                <tr>
                  <th>{confirmSelection && customerName}</th>
                  <td>{confirmSelection && numberOfSeats}</td>
                  <td>
                    {confirmSelection &&
                      selectedCheckboxes.sort().map((item: string, index: number) => (index === selectedCheckboxes.length - 1 ? item : item + ", "))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <footer>© 2023 Movie Seat Selection. All Rights Reserved | Design by W3layouts</footer>
      </div>
    </section>
  );
}
