/**
 * Convert base64 data to Blob.
 * @param {string} b64Data - Base64 data to be converted.
 * @param {string} contentType - Content type of the Blob.
 * @param {number} sliceSize - Size of each slice.
 * @returns {Blob} - Converted Blob object.
 */
export const b64toBlob = (b64Data: string, contentType = "", sliceSize = 512): Blob => {
  // Convert base64 data to byte characters
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  // Slice byte characters into chunks and convert them to byte numbers
  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    const byteNumbers = new Array(slice.length);

    // Convert each character to byte number
    for (let i = 0; i < slice.length; i += 1) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    // Create Uint8Array from byte numbers
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  // Create Blob from array of byte arrays with specified content type
  return new Blob(byteArrays, { type: contentType });
};
