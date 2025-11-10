export default function ApiError({
  res,
  statusCode = 404,
  message = "An error occurred",
}) {
  return res.status(statusCode).send({
    success: false,
    statusCode,
    detail: {
      message,
    },
  });
}

// res.status(500).send(ApiError({ statusCode: 500, message: error }));
