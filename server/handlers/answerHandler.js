exports.sendResponse = (res, content) => {
    res.json({
        state: 'success',
        content: content
    })
}