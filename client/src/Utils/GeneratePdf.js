import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function GeneratePdf(content, fileName) {
  if (!content) {
    console.error("Content not found for PDF conversion.");
    return;
  }

  html2canvas(content, { scale: 1 }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const imgWidth = canvas.width; // Use the content's width
    const imgHeight = canvas.height; // Use the content's height

    // Calculate the PDF page size based on the content size
    const pdf = new jsPDF({
      orientation: imgWidth > imgHeight ? "l" : "p", // Landscape or portrait
      unit: "px",
      format: [imgWidth, imgHeight],
      putOnlyUsedFonts: true,
      floatPrecision: 16, // or "smart", default is 16
    });

    const position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    pdf.save(fileName);
  });
}
