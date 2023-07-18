const week = ["日","月","火","水","木","金","土"];
const routine = [
    ['AP午後'],
    ['Java(servlet)','AP午後'],
    ['javascript(クライアントサイド)','python(機械学習)','AP午後'],
    ['統計学','研究開発','AP午後'],
    ['python(スクレイピング)','サークル(AWS)'],
    ['研究開発'],
    ['AtCorder']
];
const today = new Date();

var showDate = new Date(today.getFullYear(),today.getMonth(),1);

window.onload = function(){
    showProcess(today);
    showRoutine(today);
};

function prev(){
    showDate.setMonth(showDate.getMonth()-1);
    showProcess(showDate);
    showRoutine(today);
}

function next(){
    showDate.setMonth(showDate.getMonth()+1);
    showProcess(showDate);
    showRoutine(today);
}

function showProcess(date){
    var year = date.getFullYear();
    var month = date.getMonth();
    document.querySelector('#header').innerHTML = year + "年" + (month+1) + "月";
    var calendar = createProcess(year,month);
    document.querySelector('#calendar').innerHTML = calendar;
}

function createProcess(year,month){
    var calendar = "<table><tr class='dayOfWeek'>";
    for(var i=0;i<week.length;i++){
        calendar += "<th>" + week[i] + "</th>";
    }
    calendar += "</tr>";
    var count = 0;
    var startDayOfWeek = new Date(year,month,1).getDay();
    var endDate = new Date(year,month+1,0).getDate();
    var lastMonthEndDate = new Date(year,month,0).getDate();
    var row = Math.ceil((startDayOfWeek+endDate)/week.length);

    for(var i=0;i<row;i++){
        calendar += "<tr>";
        for(var j=0;j<week.length;j++){
            /**一行目の前の月のところ*/
            if(i == 0 && j < startDayOfWeek){
                calendar += "<td class='disabled'>"
                + (lastMonthEndDate - startDayOfWeek + j + 1) + "</td>";
            }else if(count >= endDate){
            /**最後の行の次の月のところ*/
                count++;
                calendar += "<td class='disabled'>"
                + (count - endDate) + "</td>";
            }else{
            /**当月のところ*/
                count++;
                /**今日かそうでないか*/
                if(year == today.getFullYear()
                && month == today.getMonth()
                && count == today.getDate()){
                    calendar += "<td class='today'>"
                    + count + "</td>";
                }else{
                    calendar += "<td>" + count + "</td>";
                }
            }
        }
        calendar += "</tr>";
    }
    calendar += "</table>"
    return calendar;
}

function showRoutine(date){
    var week = date.getDay();
    var rout = createRoutine(week);
    document.querySelector('#routine').innerHTML = rout;
}

function createRoutine(week){
    var rout = "<ul>";
    for(var i=0;i<routine[week].length;i++){
        rout += "<li>" + routine[week][i] + "</li>";
    }
    rout += "</ul>";
    return rout;
}