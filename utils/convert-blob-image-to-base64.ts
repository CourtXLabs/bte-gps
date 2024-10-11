const convertBlobImageToBase64 = async (blob: Blob): Promise<string> => {
  const buffer = await blob.arrayBuffer()
  const base64 = Buffer.from(buffer).toString("base64")
  return `data:image/png;base64,${base64}`
}

export default convertBlobImageToBase64
