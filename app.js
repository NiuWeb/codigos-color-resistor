window.addEventListener("load", function() {

    // List of main colors sorted by their numeric value (black: 0, brown: 1, ...)
    var colors = [
        "black", "brown", "red", "orange", 
        "yellow", "green", "blue", "purple", 
        "darkgray", "white"
    ];
    // list of colors representating tolerance, and its values
    var tcolors = {
        "gold": 5,
        "silver": 10
    };

    var ohms = document.getElementById("ohms");
    var tolerance = document.getElementById("tolerance");


    // Load the strip boxes
    var selected = null; // selected strip box
    var lines = [];
    for(var i = 1; i <= 4; i++) {
        var line = document.getElementById("line" + i.toString());
        lines.push(line);

        var span = document.createElement("span");
        span.style.color = line.style.backgroundColor;
        line.appendChild(span);
    }

    var tline = lines[3]; // save the last line (tolerance)
    lines.splice(3); // and remove it from the list

    // toggle tolerance
    var t = 1;
    tline.onclick = function() {
        this.style.backgroundColor = Object.keys(tcolors)[t++];
        t%=2;
        calculate();
    };

    calculate();

    // Generate the main color table
    var picker = document.getElementById("picker");
    for(var i = 0; i < colors.length; i++) {

        // create the color box
        var box = document.createElement("div");
        box.setAttribute("class", "box");
        picker.appendChild(box);

        // create the color div
        var color = document.createElement("div");
        color.setAttribute("class", "color");
        // set the div color
        color.style.backgroundColor = colors[i];
        color.i = i;

        // set the color of the selected strip when click
        color.onclick = function() {
            if(selected == null) return;
            lines[selected].style.backgroundColor = this.style.backgroundColor;
            lines[selected].children[0].style.color = this.style.backgroundColor;
            selectColor(this.i);
            calculate();
        };

        // create the color number text
        var number = document.createElement("span");
        number.style.color = colors[i];
        number.innerText = i;
        color.appendChild(number);

        // add to the main container
        box.appendChild(color);
    }
    // select a color from the table
    function selectColor(num) {
        for(var i = 0; i < picker.children.length; i++) {
            if(i == num) {
                picker.children[i].setAttribute("class", "box selected");
            }
            else {
                picker.children[i].setAttribute("class", "box");
            }
        }
    }

    // Selection of strip boxes
    function select(num) {
        selected = num;
        for(var i = 0; i < lines.length; i++) {
            if(i == num) {
                lines[i].setAttribute("class", "box stripe selected");
                var color = colors.indexOf(lines[i].style.backgroundColor);
                selectColor(color);
            }
            else {
                lines[i].setAttribute("class", "box stripe");
            }
        }
    }
    // Select the strip box when click
    for(var i = 0; i < lines.length; i++) {
        lines[i].i = i;
        lines[i].onclick = function() {
            // unselect if selected
            if(selected == this.i) {
                select(-1);
                selectColor(-1);
            }
            // select if unselected
            else {
                select(this.i);
            }
        };
    }

    // Set the values and colors for all texts
    function calculate() {
        for(var i = 0; i < lines.length; i++) {
            lines[i].children[0].style.color = lines[i].style.backgroundColor;
        }

        var a = colors.indexOf(lines[0].style.backgroundColor);
        var b = colors.indexOf(lines[1].style.backgroundColor);
        var c = colors.indexOf(lines[2].style.backgroundColor);

        lines[0].children[0].innerText = a.toString();
        lines[1].children[0].innerText = b.toString();
        lines[2].children[0].innerHTML = "10<sup>" + c.toString() + "</sup>";

        ohms.innerText = ((10*a + b)*Math.pow(10, c)).toString();

        var t = tcolors[tline.style.backgroundColor];
        tolerance.innerText = t.toString();
        tline.children[0].innerText = t.toString() + '%';
    }

});