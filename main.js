#! /usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
console.log(`Welcome to Student Management System!\n`);
// creating a class of student
class Student {
    constructor(name) {
        this.name = name;
        this.courses = [];
        this.balance = 0;
        Student.idCounter++;
        this.studentID = this.generateStudentID();
    }
    generateStudentID() {
        return 10000 + Student.idCounter; // 10001, 10002 and so on
    }
    enrollCourse(course) {
        this.courses.push(course);
        this.balance += 1000; // each course fees is 1000
    }
    viewBalance() {
        return this.balance; //  pending balance of a student
    }
    payCoursesFee(amount) {
        this.balance -= amount; // the balance of student will - amount paid by student
    }
    showStatus() {
        console.log(`
      Name: ${this.name}
      Student ID: ${this.studentID}
      Courses Enrolled: ${this.courses.join(", ")}
      Balance: ${this.balance}
      `);
    }
    getStudentID() {
        return this.studentID;
    }
    getName() {
        return this.name;
    }
}
//properties
Student.idCounter = 0;
// class ends here
const students = []; // students list will be stored here
// mainMenu start
function mainMenu() {
    return __awaiter(this, void 0, void 0, function* () {
        const userInputMenu = yield inquirer_1.default.prompt({
            type: 'list',
            name: 'menu',
            message: 'Select your Menu!',
            choices: [
                { name: "1. Add New Student", value: "ADD_STUDENT" },
                { name: "2. Enroll Student in Course", value: "ENROLL_COURSE" },
                { name: "3. View Student Balance", value: "VIEW_BALANCE" },
                { name: "4. Pay course fees", value: "PAY_FEES" },
                { name: "5. Show Student Status", value: "SHOW_STATUS" },
                { name: "6. End Menu", value: "END_MENU" }
            ]
        });
        // destructuring
        const { menu } = userInputMenu;
        if (menu === "ADD_STUDENT")
            yield addNewStudent();
        if (menu === "ENROLL_COURSE")
            yield enrollStudent();
        if (menu === "VIEW_BALANCE")
            yield viewBalance();
        if (menu === "PAY_FEES")
            yield payTuition();
        if (menu === "SHOW_STATUS")
            yield showStatus();
        if (menu === "END_MENU") {
            console.log(`Thank you for using Student Management System\n`);
            process.exit();
        }
        mainMenu();
    });
}
// mainMenu ends
// start creating functions
// addNewStudent start here
function addNewStudent() {
    return __awaiter(this, void 0, void 0, function* () {
        const userInput = yield inquirer_1.default.prompt({
            type: 'input',
            name: 'name',
            message: 'Enter Student Name here!'
        });
        const student = new Student(userInput.name);
        students.push(student);
        console.log(`Student ${student.getName()} added with ID ${student.getStudentID()}\n`);
    });
}
// addNewStudent ends here
// enrollStudent start here
function enrollStudent() {
    return __awaiter(this, void 0, void 0, function* () {
        const student = yield selectStudent(); // we will create this function after
        if (student) {
            const userInput = yield inquirer_1.default.prompt({
                type: 'list',
                name: 'course',
                message: 'Select courses to enroll',
                choices: [
                    { name: 'TypeScript', value: 'TypeScript' },
                    { name: 'JavaScript', value: 'JavaScript' },
                    { name: 'Python', value: 'Python' },
                    { name: 'Next.js', value: 'Next.js' }
                ]
            });
            student.enrollCourse(userInput.course);
            console.log(`Successfully Enrolled in Course: ${userInput.course}`);
        }
    });
}
// enrollStudent ends here
// viewBalance start here
function viewBalance() {
    return __awaiter(this, void 0, void 0, function* () {
        const student = yield selectStudent();
        if (student) {
            console.log(`Balance: ${student.viewBalance()}`);
        }
    });
}
// viewBalance ends here
//payTuition() starts here
function payTuition() {
    return __awaiter(this, void 0, void 0, function* () {
        const student = yield selectStudent();
        if (student) {
            const userInput = yield inquirer_1.default.prompt({
                type: 'input',
                name: 'amount',
                message: 'Enter amount you want to pay?'
            });
            student.payCoursesFee(parseFloat(userInput.amount));
            console.log(`Paid ${userInput.amount}. Balance remaining ${student.viewBalance()}`);
        }
    });
}
//payTuition() ends here
// showStatus() starts here
function showStatus() {
    return __awaiter(this, void 0, void 0, function* () {
        const student = yield selectStudent();
        if (student) {
            student.showStatus();
        }
    });
}
// showStatus() ends here
// selectStudent() start here
function selectStudent() {
    return __awaiter(this, void 0, void 0, function* () {
        if (students.length === 0) {
            console.log('No Students record available.\n');
        }
        else {
            const stdSelect = yield inquirer_1.default.prompt({
                type: 'list',
                name: 'stdID',
                message: 'Select a student!',
                choices: students.map((std) => ({
                    name: std.getName(),
                    value: std.getStudentID()
                }))
            });
            return (students.find((std) => std.getStudentID() === stdSelect.stdID) || null);
        }
    });
}
// selectStudent() start here
mainMenu();
