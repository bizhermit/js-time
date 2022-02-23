const { TimeUtils } = require("./dist/index");
const Time = require("./dist/index").default;

// {
//     console.log("- empty");
//     const time = new Time();
//     console.log(time.format());
// }
// {
//     console.log("- number");
//     const date = new Date();
//     console.log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`);
//     const num = date.getMilliseconds() + date.getSeconds() * 1000 + date.getMinutes() * 1000 * 60 + date.getHours() * 1000 * 60 * 60;
//     const time = new Time(num);
//     console.log(time.format());
// }
// {
//     console.log("- string");
//     const time = new Time("12:34:56.789");
//     console.log(time.format());
// }
// {
//     console.log("- date");
//     const time = new Time(new Date("2022-02-24 23:49:51.234"));
//     time.addHours(-30).addMinutes(-1);
//     console.log(time.format());
// }
// {
//     console.log("- time");
//     const time = new Time(new Time("1:2:3.4"));
//     // time.setMinutes(431);
//     // console.log(time.getSeconds());
//     // console.log(time.getSeconds(true));
//     console.log(time.format());
// }

// console.log(TimeUtils.average(new Time("0:30"), new Time("2:30"), new Time("4:03p")).format());
const time = new Time();
const average = TimeUtils.average(
    new Time("4:31"),
    new Time("02:03:04"),
    new Time("36:12:40.423"),
    new Time(time),
    new Time(new Date()),
);
console.log(average.format("hh:mm:ss.SSS"));