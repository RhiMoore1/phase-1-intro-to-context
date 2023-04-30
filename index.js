// Your code here
function createEmployeeRecord(recordArray) {
    return {
        firstName: recordArray[0],
        familyName: recordArray[1],
        title: recordArray[2],
        payPerHour: recordArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(recordArray) {
    const employeeRecords = recordArray.map(createEmployeeRecord);
    //const firstName = employeeRecords.map((record) => record.firstName);
    return employeeRecords;
}

function createTimeInEvent(record, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    record.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(hour),
        date: date
    });
    return record;
}

function createTimeOutEvent(record, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    record.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(hour),
        date: date
    });
    return record;
}

function hoursWorkedOnDate(record, date) {
    const timeInEvent = record.timeInEvents.find(event => event.date === date);
    const timeOutEvent = record.timeOutEvents.find(event => event.date === date);
    
    const timeIn = parseInt(timeInEvent.hour);
    const timeOut = parseInt(timeOutEvent.hour);

    return (timeOut - timeIn) / 100;
}
hoursWorkedOnDate(["Julius", "Caesar", "General", 1000])

function wagesEarnedOnDate(record, date) {
    const hoursWorkd = hoursWorkedOnDate(record, date);
    const payRate = record.payPerHour;
    const payDay = hoursWorkd * payRate;
    return payDay
}

function allWagesFor(record) {
    const datesWorked = record.timeInEvents.map(event => event.date);
    const totalPay = datesWorked.reduce((total, date) => {
        return total + wagesEarnedOnDate(record, date);
    }, 0);
    return totalPay; 
}

function calculatePayroll(record) {
    const totalPay = record.reduce((total, record) => {
        return total + allWagesFor(record);
    }, 0)
    return totalPay;
}