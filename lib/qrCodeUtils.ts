export const arrayBufferToBase64 = (
  buffer: ArrayBuffer | Uint8Array
): string => {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;

  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return window.btoa(binary);
};

export const getQrCodeSrc = (
  qrCodeImage?: ArrayBuffer | Uint8Array
): string | null => {
  if (!qrCodeImage) return null;
  return `data:image/png;base64,${arrayBufferToBase64(qrCodeImage)}`;
};
