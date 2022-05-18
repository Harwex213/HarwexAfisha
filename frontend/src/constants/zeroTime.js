import moment from "moment";

export default moment().utcOffset(0).set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
