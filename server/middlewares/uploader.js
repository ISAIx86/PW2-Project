exports.uploadInDestiny = async (destiny, file, filename) => {
    const extension = file.name.split('.').pop()
    const new_filename = `${filename}.${extension}`
    const final_path = `${destiny}/${new_filename}`
    await file.mv(final_path)
    return { final_path, new_filename}
}