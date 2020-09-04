function getTimeStamp() {
    const date = new Date();
    // DATE
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'];
    let da ,mo, ye;
        da = date.getDate();
        mo = months[date.getMonth()];
        ye = date.getFullYear();

    let timestamp = `${mo} ${da}, ${ye}`;

    return timestamp;
}
export default getTimeStamp;