export default function ApiError(statusCode, detailMessage) {
  return {
    success: false,
    statusCode,
    error: {
      detailMessage,
    },
  };
}
