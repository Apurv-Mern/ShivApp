import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
export const ExportToExcelForEvent = ({ apiData, fileName }) => {
  const excelData = [
    ["Guest Name", "Group Name", "Guest of Guests", "Mobile Number"],
  ];
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  apiData.forEach((item) => {
    const groupName = item.groupname;
    item.guests.forEach((guest) => {
      const guestName = guest.guest_name;
      const guestOfGuests = guest.guests_of_guest;
      excelData.push([guestName, groupName, guestOfGuests, ""]);
    });
  });
  const exportToCSV = (excelData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(excelData);
    XLSX.utils.sheet_add_aoa(ws, excelData, {
      origin: "A1",
    });
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <button
      className="gustpdf-btn"
      onClick={(e) => exportToCSV(excelData, fileName)}
    >
      Export{" "}
    </button>
  );
};

export const ExportToExcel = ({ apiData, fileName, excelData }) => {
  console.log("api", apiData);
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    XLSX.utils.sheet_add_aoa(ws, excelData, {
      origin: "A1",
    });
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <button
      className="gustpdf-btn"
      onClick={(e) => exportToCSV(apiData, fileName)}
    >
      Export{" "}
    </button>
  );
};

export const ExportToExcelForFood = ({ apiData, fileName }) => {
  const excelData = [
    [
      "Guest Name",
      "Mobile Number",
      "Food",
      "First Preference",
      "Second Preference",
    ],
  ];
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  apiData.forEach((item) => {
    const mobile = item.mobile_number;
    const guestName = item.guest_name;
    const first_preference = item.first_preference;
    const second_preference = item.second_preference;
    const food = item.food.join(", "); // Join food items with a comma and space

    excelData.push([
      guestName,
      mobile,
      food,
      first_preference,
      second_preference,
    ]);
  });
  const exportToCSV = (excelData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(excelData);
    XLSX.utils.sheet_add_aoa(ws, excelData, {
      origin: "A1",
    });
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <button
      className="gustpdf-btn"
      onClick={(e) => exportToCSV(excelData, fileName)}
    >
      Export{" "}
    </button>
  );
};

// Define the initial header row outside the component

export const ExportToExcelForTemplate = ({ fileName, apiData }) => {
  const excelData = [["guest_name", "email", "mobile_number", "group"]];
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  apiData.forEach((item) => {
    const rowData = ["", "", "", ""]; // Remove the extra array around each rowData
    excelData.push([...rowData]); // Create a new array for each row of data
  });

  const exportToCSV = (excelData, fileName) => {
    const ws = XLSX.utils.aoa_to_sheet(excelData); // Use aoa_to_sheet for array of arrays
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <button
      className="gustpdf-btn btn"
      onClick={(e) => exportToCSV(excelData, fileName)}
    >
      Shiv Contact Template
    </button>
  );
};

export const ExportToExcelForGift = ({ apiData, fileName }) => {
  const excelData = [
    [
      "Guest No.",
      "Guest Name",
      "Guest Of",
      "Email",
      "Number",
      "Group",
      "Gift Received",
      "Gift Type",
      "Gift Value",
      "Notes",
    ],
  ];

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  let i = 1;
  apiData.forEach((item, index) => {
    console.log(index);
    const rowData = [
      i++, // Guest No.
      item.guest_name,
      "Bride", // Guest Of
      item.email, // Email
      item.number, // Number
      item.group, // Group
      item.gift_received ? "Yes" : "No", // Gift Received
      item.gift_type || "", // Gift Type
      item.gift_value || "", // Gift Value
      item.notes || "", // Notes
    ];

    excelData.push([...rowData]); // Create a new array for each row of data
  });

  const exportToCSV = (excelData, fileName) => {
    const ws = XLSX.utils.aoa_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <div className="col-md-6">
      <button
        className="gustpdf-btn gustpdf-btn2"
        onClick={(e) => exportToCSV(excelData, fileName)}
      >
        Export Excel
      </button>
    </div>
  );
};
