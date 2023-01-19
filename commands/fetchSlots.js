import { listOfCourts } from "../constants/listOfCourts";

const fetchslots = async (location, date) => {
  //selectedDate=02/09/2022
  let ans = await fetch(
    "https://www.onepa.gov.sg/pacesapi/facilityavailability/GetFacilitySlots?selectedFacility=" +
      location +
      "_BADMINTONCOURTS&selectedDate=" +
      date
  )
    .then((response) => response.json())
    .catch(function (error) {
      console.log(
        "There has been a problem with your fetch operation: " + error.message
      );
      // ADD THIS THROW error
      throw error;
    });

  return ans?.response?.resourceList;
};

export const cleanFetchSlots = async (date) => {
  console.log("button clicked! fetching... for " + date);
  let arrayToDisplay = "";

  for (let facilities of listOfCourts) {
    arrayToDisplay += "mnm" + facilities + "mnm\n";
    let fetchedListOfCourts = await fetchslots(facilities, date);

    for (let [index, resourceList] of fetchedListOfCourts.entries()) {
      arrayToDisplay += "court " + (index + 1) + " \n";
      for (let slotList of resourceList.slotList) {
        if (slotList.isAvailable) {
          arrayToDisplay += slotList.timeRangeName + "\n";
        }
      }
    }
  }
  return arrayToDisplay;
};
