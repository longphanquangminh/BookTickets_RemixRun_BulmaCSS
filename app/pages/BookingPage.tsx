import "../assets/video27_dat_ve_phim/BaiTapBookingTicket.css";
import "./BookingPage.css";
import danhSachGhe from "../assets/video27_dat_ve_phim/danhSachGhe.json";
import type { danhSachGheType } from "~/types/danhSachGheType";
import type { hangVaDanhSachType } from "~/types/hangVaDanhSachType";
import { connect } from "react-redux";
import { CHAIR_CHANGES, CHANGE_CUSTOMER_NAME, CHANGE_NUMBER_OF_SEATS, CONFIRM_BOOKING, START_SELECTING } from "~/constants/bookingConstants";

function BookingPage(props: any) {
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
                    disabled={props.openToSelect || props.confirmSelection}
                    readOnly={props.openToSelect || props.confirmSelection}
                    className='input'
                    type='text'
                    placeholder='Name'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.handleChangeCustomerName(e.target.value)}
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
                    disabled={props.openToSelect || props.confirmSelection}
                    readOnly={props.openToSelect || props.confirmSelection}
                    className='input'
                    type='number'
                    min='1'
                    placeholder='Number of Seats'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.handleChangeNumberOfSeats(parseInt(e.target.value))}
                  />
                </p>
              </div>
            </div>
          </div>
          <div className='is-flex is-justify-content-center'>
            <button className='button is-link is-rounded' onClick={props.handleSelect} disabled={props.openToSelect || props.confirmSelection}>
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
          {props.openToSelect && (
            <div className='my-3 has-text-black content has-background-warning has-text-centered'>Please Select your Seats NOW!</div>
          )}
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
                            props.selectedCheckboxes.includes(itemGhe.soGhe) ? "has-background-success" : ""
                          }`}
                          htmlFor={`itemDatGhe-${itemGhe.soGhe}`}
                        ></label>
                        <input
                          id={`itemDatGhe-${itemGhe.soGhe}`}
                          checked={props.selectedCheckboxes.includes(itemGhe.soGhe)}
                          onChange={() => props.handleCheckboxChange(itemGhe.soGhe)}
                          type='checkbox'
                          className='is-hidden'
                          value={itemGhe.soGhe}
                          disabled={props.openToSelect == false || itemGhe.daDat || itemGhe.gia <= 0}
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
            <button disabled={!props.openToSelect} className='button is-link is-rounded' onClick={props.handleConfirm}>
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
                  <th>{props.confirmSelection && props.customerName}</th>
                  <td>{props.confirmSelection && props.numberOfSeats}</td>
                  <td>
                    {props.confirmSelection &&
                      props.selectedCheckboxes
                        .sort()
                        .map((item: string, index: number) => (index === props.selectedCheckboxes.length - 1 ? item : item + ", "))}
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

let mapStateToProps = (state: any) => {
  return {
    customerName: state.bookingReducer.customerName,
    numberOfSeats: state.bookingReducer.numberOfSeats,
    openToSelect: state.bookingReducer.openToSelect,
    confirmSelection: state.bookingReducer.confirmSelection,
    selectedCheckboxes: state.bookingReducer.selectedCheckboxes,
  };
};

let mapDispatchToProps = (dispatch: any) => {
  return {
    handleSelect: () => {
      let action = {
        type: START_SELECTING,
      };
      dispatch(action);
    },
    handleConfirm: () => {
      let action = {
        type: CONFIRM_BOOKING,
      };
      dispatch(action);
    },
    handleCheckboxChange: (label: string) => {
      let action = {
        type: CHAIR_CHANGES,
        payload: label,
      };
      dispatch(action);
    },
    handleChangeCustomerName: (label: string) => {
      let action = {
        type: CHANGE_CUSTOMER_NAME,
        payload: label,
      };
      dispatch(action);
    },
    handleChangeNumberOfSeats: (label: number) => {
      let action = {
        type: CHANGE_NUMBER_OF_SEATS,
        payload: label,
      };
      dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingPage);
