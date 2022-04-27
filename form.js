// set min date to today
function setDateMin(){
    var today = new Date();
    var fullmax;

    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    if(dd<10){
    dd='0'+dd
    } 
    if(mm<10){
    mm='0'+mm
    } 

    today = yyyy+'-'+mm+'-'+dd;
    document.getElementById('leaveFrom-input').setAttribute('min', today);
    document.getElementById('leaveTo-input').setAttribute('min', today);
}
// set leaveTo-input min to leaveFrom-input selected date
function setLeaveTo(){
    document.getElementById('leaveTo-input').setAttribute('min', document.getElementById('leaveFrom-input').value);
    //set leaveTo-input max depending on the leaveCount
    leaveDaysCount();
    document.getElementById('leaveTo-input').setAttribute('max', today);
}

// set leaveFrom-input max to leaveTo-input selected date
function setLeaveFrom(){
    document.getElementById('leaveFrom-input').setAttribute('max', document.getElementById('leaveTo-input').value);
}

//set leaveTo-input max depending on the leaveCount and dayType
function leaveDaysCount(){
    // get chosen day type
    let dayType_chosen;
    let dayType = document.getElementsByName('day');
    for(let i = 0; i < dayType.length; i++){
        if(dayType[i].checked){
            dayType_chosen = dayType[i].value;
            break;
        }
    }

    var d = new Date(document.getElementById('leaveFrom-input').value)
    var days = parseInt(document.getElementById('leave-count').innerHTML);

    if(dayType_chosen != null){
        if(dayType_chosen == 'full')
        {
            var count = 0;
            while (count < days-1) {
                d.setDate(d.getDate() + 1);
                if (d.getDay() != 0 && d.getDay() != 6) // Skip weekends
                    count++;
            }

        }else{
            var count = 0;
            while (count < (days/0.5)-1) {
                d.setDate(d.getDate() + 1);
                if (d.getDay() != 0 && d.getDay() != 6) // Skip weekends
                    count++;
            }
        }
    }else{
        var count = 0;
        while (count < days-1) {
            d.setDate(d.getDate() + 1);
            if (d.getDay() != 0 && d.getDay() != 6) // Skip weekends
                count++;
        }
    }
    
    dd = d.getDate();
    mm = d.getMonth()+1; 
    yyyy = d.getFullYear();
    if(dd<10){
      dd='0'+dd
    } 
    if(mm<10){
      mm='0'+mm
    } 
    
    return today = yyyy+'-'+mm+'-'+dd;

}

// if daytype was changed
function setDayType(){
    document.getElementById('leaveFrom-input').value = "";
    document.getElementById('leaveFrom-input').removeAttribute("min");
    document.getElementById('leaveFrom-input').removeAttribute("max");

    document.getElementById('leaveTo-input').value = "";
    document.getElementById('leaveTo-input').removeAttribute("min");
    document.getElementById('leaveTo-input').removeAttribute("max");

    setDateMin();
}



// button event
const init = function(){
    document.getElementById('submit-btn').addEventListener('click', send);
    document.getElementById('cancel-btn').addEventListener('click', reset);
}

const send = function(e){
    e.preventDefault();
    
    // check if error message already exist
    let error_div = document.getElementById('errMessage-div');
    if(error_div.hasChildNodes()){
        error_div.removeChild(error_div.firstElementChild);
    }

    let valid = validate();
    if(valid){
        document.getElementById("leave-form").submit();
    }else{
        const err = document.createElement('p');
        const errormsg = document.createTextNode('Please fill out all required fields*.');
        err.appendChild(errormsg);
        document.getElementById('errMessage-div').appendChild(err);
    }
}

const validate = function(e){
    let valid = false;
    let leaveType_valid = false;
    let dayType_valid = false;

    let leaveType = document.getElementsByName('leave');
    let dayType = document.getElementsByName('day');
    let leaveFrom = document.getElementById('leaveFrom-input').value;
    let leaveTo = document.getElementById('leaveTo-input').value;
    
    for(let i = 0; i < leaveType.length; i++){
        if(leaveType[i].checked){
            leaveType_valid = true;
            break;
        }
    }

    for(let i = 0; i < dayType.length; i++){
        if(dayType[i].checked){
            dayType_valid = true;
            break;
        }
    }

    if(leaveType_valid && dayType_valid && leaveFrom && leaveTo ){
        valid = true;
    }
    
    return valid;

}

const reset = function(e){
    e.preventDefault();
    document.getElementById('leave-form').reset()

    // check if error message already exist
    let error_div = document.getElementById('errMessage-div');
    if(error_div.hasChildNodes()){
        error_div.removeChild(error_div.firstElementChild);
    }

    document.getElementById('leaveFrom-input').removeAttribute("min");
    document.getElementById('leaveFrom-input').removeAttribute("max");

    document.getElementById('leaveTo-input').removeAttribute("min");
    document.getElementById('leaveTo-input').removeAttribute("max");

    setDateMin();
}

document.addEventListener('DOMContentLoaded', init);