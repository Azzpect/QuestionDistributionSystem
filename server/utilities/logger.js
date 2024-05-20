const fs = require("fs");
const path = require("path");

class LoggerClass {
    constructor(filePath) {
        this.filePath = filePath;
        this.colors = {
            reset: "\x1b[0m",
            red: "\x1b[31m",
            yellow: "\x1b[33m",
            blue: "\x1b[34m",
        };
        fs.writeFileSync(this.filePath, "");
    }
    getFormattedDateTime() {
        let dt = new Date();
        let hour = dt.getHours();
        let minute = dt.getMinutes();
        let sec = dt.getSeconds();
        let formattedDateTime = `${dt.getDate()}/${dt.getMonth()+1}/${dt.getFullYear()} ${hour<10?"0"+hour:hour}:${minute<10?"0"+minute:minute}:${sec<10?"0"+sec:sec}`;
        return formattedDateTime;
    }
    info(message) {
        let formattedDateTime = this.getFormattedDateTime();
        let msg = `${this.colors.blue}INFO${this.colors.reset} (${formattedDateTime}): ${message}\n`;
        fs.appendFileSync(this.filePath, msg);
    }
    warning(message) {
        let formattedDateTime = this.getFormattedDateTime();
        let msg = `${this.colors.yellow}WARNING${this.colors.reset} (${formattedDateTime}): ${message}\n`;
        fs.appendFileSync(this.filePath, msg);
    }
    error(message) {
        let formattedDateTime = this.getFormattedDateTime();
        let msg = `${this.colors.red}ERROR${this.colors.reset} (${formattedDateTime}): ${message}\n`;
        fs.appendFileSync(this.filePath, msg);
    }
}



const Logger = new LoggerClass(path.join(__dirname, "../.log"))

module.exports = { Logger }