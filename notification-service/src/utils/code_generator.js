const unique_code_generator = (length = 8) => {
    const now = new Date();
    const pad = (n, size = 2) => n.toString().padStart(size, "0");

    const date = [
      now.getFullYear(),
      pad(now.getMonth() + 1),
      pad(now.getDate())
    ].join("");

    const time = [
      pad(now.getHours()),
      pad(now.getMinutes()),
      pad(now.getSeconds())
    ].join("");

    const milliseconds = pad(now.getMilliseconds(), 3);

    return `${prefix}${date}${time}${milliseconds}`;
}

module.exports = {
  unique_code_generator,
};