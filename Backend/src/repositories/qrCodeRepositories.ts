import QrCodeModel from "../models/qrCodeModal";


export async function saveQrCodeUrl(eventId: string, userId: string, qrCodeUrl: string) {
  await QrCodeModel.create({ eventId, userId, qrCodeUrl });
}


export async function deleteQrCodeUrl(eventId: string, userId: string) {
  await QrCodeModel.deleteOne({ eventId, userId });
}
