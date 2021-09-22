var dateInputRef = document.querySelector("#bday-input");
var checkButton = document.querySelector(".btn-check");
var outputMessage = document.querySelector(".output-message");
var count = 0;
var pcount = 0;

function reverseString(str) {
    var listOfChars = str.split("");
    var reverseListOfChars = listOfChars.reverse();
    var reversedStr = reverseListOfChars.join("");
    return reversedStr;

}

function isPalindrome(str) {
    var reversed = reverseString(str);
    return str === reversed;
}

function convertDateToString(date) {
    var dateStr = {
        day: "",
        month: "",
        year: ""
    };

    if (date.day < 10) {
        dateStr.day = "0" + date.day;
    } else {
        dateStr.day = date.day.toString();
    }

    if (date.month < 10) {
        dateStr.month = "0" + date.month;
    } else {
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();

    return dateStr;

}

function getAllDateFormats(date) {
    var dateStr = convertDateToString(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.year;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);

    listOfFormats = [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd]
    return listOfFormats;
}

function checkPalindromeForAllDateFormats(date) {
    var listOfPalindromes = getAllDateFormats(date);
    var isItAPalindrome = false;
    for (let i = 0; i < listOfPalindromes.length; i = i + 1) {

        if (isPalindrome(listOfPalindromes[i])) {
            isItAPalindrome = true;
            break;
        }
    }
    return isItAPalindrome;
}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInAMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month == 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month = month + 1;
            }
        } else {
            if (day > 28) {
                day = 1;
                month = month + 1;
            }
        }

    } else {
        if (day > daysInAMonth[month - 1]) {
            day = 1;
            month = month + 1;
        }
    }

    if (month > 12) {
        month = 1;
        year = year + 1;
    }

    return {
        day: day,
        month: month,
        year: year
    }

}

function isLeapYear(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false;
    }
    if (year % 4 === 0) {
        return true;
    }

    return false;

}

function getNextPalindromeDate(date) {
    var nextDate = getNextDate(date)

    while (1) {
        count = count + 1;
        var isItAPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if (isItAPalindrome) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }

    return convertDateToString(nextDate);

}

function clickHandler() {
    var bdayStr = dateInputRef.value;
    console.log(bdayStr);

    if (bdayStr !== "") {
        var listOfDate = bdayStr.split('-')
        var date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        }

        var isPalindrome = checkPalindromeForAllDateFormats(date);

        if (isPalindrome) {
            outputMessage.innerText = "It is a palindrome 😃"
        } else {
            let nextDate = getNextPalindromeDate(date);
            let previousDate = getPreviousPalindromeDate(date);

            outputMessage.innerText = "The previous palindrome date was on " + String(previousDate.month) + "/" + String(previousDate.day) + "/" + String(previousDate.year) + " missed it by " + String(pcount) + " days and the next palidrome date is  " + String(nextDate.month) + "/" + String(nextDate.day) + "/" + String(nextDate.year) + "  you missed it by " + String(count) + " days! 😮";
        }

        count = 0;
        pcount = 0;
        console.log(date)
    } else {
        outputMessage.innerText = "Please enter a valid date 🤨"
    }
}


function getPreviousDate(date) {
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;

    var daysInAMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (day == 0) {
        if (month - 1 == 2) {
            month = month - 1;
            if (isLeapYear(year)) {
                day = 29;
            } else {
                day = 28;
            }
        } else {
            if (daysInAMonth[month - 2] == 31) {
                day = 31;
                month = month - 1;
            } else {
                day = 30;
                month = month - 1;
            }
        }
        if (month == 0) {
            month = 12;
            year = year - 1;
        }
    }
    return {
        day: day,
        month: month,
        year: year
    }

}

function getPreviousPalindromeDate(date) {
    var previousDate = getPreviousDate(date)

    while (1) {
        pcount = pcount + 1;
        var isItAPalindrome = checkPalindromeForAllDateFormats(previousDate);
        if (isItAPalindrome) {
            break;
        }
        previousDate = getPreviousDate(previousDate);
    }

    return convertDateToString(previousDate);
}

checkButton.addEventListener("click", clickHandler);