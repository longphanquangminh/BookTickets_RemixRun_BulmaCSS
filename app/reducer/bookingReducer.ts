import type { bookingStateType } from "~/types/bookingStateType";
import { CHAIR_CHANGES, CHANGE_CUSTOMER_NAME, CHANGE_NUMBER_OF_SEATS, CONFIRM_BOOKING, START_SELECTING } from "~/constants/bookingConstants";

const initialState: bookingStateType = {
  customerName: "",
  numberOfSeats: 0,
  openToSelect: false,
  confirmSelection: false,
  selectedCheckboxes: [],
};

type StartSelectingAction = {
  type: typeof START_SELECTING;
};

type ConfirmBookingAction = {
  type: typeof CONFIRM_BOOKING;
};

type ChangeCustomerNameAction = {
  type: typeof CHANGE_CUSTOMER_NAME;
  payload: string;
};

type ChangeNumberOfSeatsAction = {
  type: typeof CHANGE_NUMBER_OF_SEATS;
  payload: number;
};

type ChairChangesAction = {
  type: typeof CHAIR_CHANGES;
  payload: string;
};

type BookingAction = StartSelectingAction | ConfirmBookingAction | ChangeCustomerNameAction | ChangeNumberOfSeatsAction | ChairChangesAction;

export let bookingReducer = (state = initialState, action: BookingAction) => {
  switch (action.type) {
    case START_SELECTING: {
      let tempState = { ...state };
      if (tempState.customerName === "" || tempState.numberOfSeats <= 0) {
        alert("Tên không được để trống và số ghế phải lớn hơn 0.");
      } else {
        tempState.openToSelect = true;
      }
      return { ...tempState };
    }
    case CONFIRM_BOOKING: {
      let tempState = { ...state };
      if (tempState.numberOfSeats === tempState.selectedCheckboxes.length) {
        tempState.confirmSelection = true;
        tempState.openToSelect = false;
      } else {
        alert(`Vui lòng đặt chính xác ${tempState.numberOfSeats} ghế.`);
      }
      return { ...tempState };
    }
    case CHANGE_CUSTOMER_NAME: {
      let tempState = { ...state };
      tempState.customerName = action.payload;
      return { ...tempState };
    }
    case CHANGE_NUMBER_OF_SEATS: {
      let tempState = { ...state };
      tempState.numberOfSeats = action.payload;
      return { ...tempState };
    }
    case CHAIR_CHANGES: {
      let tempState = { ...state };
      if (tempState.selectedCheckboxes.includes(action.payload)) {
        tempState.selectedCheckboxes = tempState.selectedCheckboxes.filter(item => item !== action.payload);
      } else {
        tempState.selectedCheckboxes = [...tempState.selectedCheckboxes, action.payload];
      }
      return { ...tempState };
    }
    default:
      return state;
  }
};
