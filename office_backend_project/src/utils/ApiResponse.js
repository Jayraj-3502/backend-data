export default function ApiResponse({
  res,
  statusCode = 200,
  actionType = "",
  data = {},
}) {
  return res.status(statusCode).send({
    success: true,
    statusCode,
    actionType,
    data,
  });
}
