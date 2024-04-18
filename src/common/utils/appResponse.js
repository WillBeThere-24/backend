export function AppResponse(res, statusCode, message, data) {
    return res.status(statusCode ?? 200).json({
        status: true,
        message: message,
        data: data
    });
}
