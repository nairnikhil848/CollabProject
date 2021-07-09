function task (id,text,isstriked,dateAdded) {
    this.id = id;
    this.text = text;
    this.isstriked = isstriked;
    this.dateAdded = dateAdded;
}

var service = function(){
    var  data = {}

    data.getList = function(){

        var ListsOfTasks = localStorage.getItem('CollabToDoList');
        ListsOfTasks = ListsOfTasks ? JSON.parse(ListsOfTasks) : [];
        return ListsOfTasks;
    }

    data.save = function(list){
        localStorage.setItem('CollabToDoList', JSON.stringify(list))
    }
    return  data
}();


for(i=0;i<service.getList().length;i++){
    display(service.getList()[i]);  
}

function display(task){

        var newli

        var newli = document.createElement("li");
        newli.id = task.id ;   
        $('<label>'+task.text+'</label>').appendTo(newli);

        if(task.isstriked){
            $(newli).children().css('text-decoration', 'line-through');
        }
        
        var btn = document.createElement("button");
        var txt = document.createTextNode("Toggle");
        btn.appendChild(txt);
        btn.addEventListener('click', toggleStrike );
        btn.className = "close";
        
        newli.appendChild(document.createTextNode("\u00A0"));
        newli.appendChild(document.createTextNode("\u00A0"));
        newli.appendChild(document.createTextNode("..."));
        newli.appendChild(document.createTextNode(moment(task.dateAdded).fromNow()));
        newli.appendChild(document.createTextNode("\u00A0"));
        newli.appendChild(document.createTextNode("\u00A0"));
        newli.appendChild(document.createTextNode("\u00A0"));
    
        newli.appendChild(btn);

        $("#list").prepend(newli);
}

function toggleStrike(){
    var li = $(this).parent();
    var id = li.attr('id');
    var list = service.getList();
    for(i=0;i<list.length;i++){
        if(list[i].id == id){

            toggleInList(li,list[i])
            service.save(list);

        }  
    }
}
function toggleInList(li,task){
    if(task.isstriked){
        task.isstriked = false;
        li.find('label').css('text-decoration', 'none');
        service.save(list);
        return
    }
    task.isstriked =true;
    li.find('label').css('text-decoration', 'line-through');
    return
}


$("#addbtn").click(addtoList);

function addtoList(){

    var text = $("#text").val();
    var d = new Date();
    var n = d.getTime();
    var newtask = new task(service.getList().length,text,false,n);
    console.log(newtask);
    var list = service.getList();
    list.push(newtask);
    service.save(list);

    display(newtask)
    
}