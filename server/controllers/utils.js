function isValidDate(dateString) {
    // Check if the input is a valid date string
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return false;
    }
  
    // Create a new Date object from the input
    const date = new Date(dateString);
  
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return false;
    }
  
    // Check if the year, month, and day values match the input
    const [year, month, day] = dateString.split('-');
    if (
      date.getFullYear() !== parseInt(year, 10) ||
      date.getMonth() + 1 !== parseInt(month, 10) ||
      date.getDate() !== parseInt(day, 10)
    ) {
      return false;
    }
  
    return true;
  }

  // const inputString = `
  // ✓ First name – Text box – alpha only
  // ✓ Last name – Text box – alpha only
  // ✓ Email - text box with format validation
  // ✓ Mobile number - text box with format validation also country code
  // ✓ Guest of - Text box 	
  // `;
  
  // // Split the input string into lines
  // const lines = inputString.trim().split('\n');
  
  // // Process each line and create the desired format
  // const formattedLines = lines.map(line => {
  //     const formattedLine = `('${line.trim()}'),`;
  //     return formattedLine;
  // });
  
  // // Join the formatted lines into a single string
  // const formattedOutput = formattedLines.join('\n');
  
  // console.log(formattedOutput);

  module.exports= isValidDate;  