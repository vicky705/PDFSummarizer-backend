import vision  from '@google-cloud/vision'

export const getTextFromPdfGoogle = async(file) => {
    console.log(file)
    const client = vision.ImageAnnotatorClient()

    const [result] = await client.labelDetection(file)

    const labels = result.labelAnnotations
    console.log("Labels", labels)
    return "Done"
} 