export default function ApiError({ statusCode = 401, detailMessage = "" }) {
  return {
    success: false,
    statusCode,
    error: {
      detailMessage,
    },
  };
}
