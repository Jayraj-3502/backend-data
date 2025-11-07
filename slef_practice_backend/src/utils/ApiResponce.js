export default function ApiResponce({
  statusCode = 201,
  activityType = "",
  responceData = {},
}) {
  return {
    success: true,
    statusCode,
    activityType,
    data: {
      responceData,
    },
  };
}
