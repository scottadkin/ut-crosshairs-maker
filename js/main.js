const _parent = document.getElementById("wrapper");
const _ini = document.getElementById("ini");
const _package = document.getElementById("package-name");
const _width = document.getElementById("width");
const _height = document.getElementById("height");
const _thicknessX = document.getElementById("thickness-x");
const _thicknessY = document.getElementById("thickness-y");
const _centerGap = document.getElementById("center-gap");
const _offsetX = document.getElementById("offset-x");
const _offsetY = document.getElementById("offset-y");


let _crosshairs = [];


const _currentDownloaded = [];


const updateIni = () =>{

    let string = ``;

    for(let i = 0; i < _currentDownloaded.length; i++){

        string += `CrossHairs[${i}]=${_package.value}.${_currentDownloaded[i]}\n`;
    }

    _ini.innerHTML = string;

}

const eventElems = [
    _package,
    _width,
    _height,
    _thicknessX,
    _thicknessY,
    _centerGap,
    _offsetX,
    _offsetY
];

for(let i = 0; i < eventElems.length; i++){

    eventElems[i].addEventListener("change", () =>{

        _parent.innerHTML = '';
        updateIni();

        new Crosshair(_width.value, _height.value, _thicknessX.value, _thicknessY.value, _centerGap.value);
       // for(let i = 0; i < 32; i++){

          //  new Crosshair(i + 1, i + 1, 1, 1, 0, i);
       // }
    });
}


class Crosshair{

    constructor(width, height, thicknessX, thicknessY, centerGap){

        console.log(arguments);
        this.packName = "xhairtests";

        this.width = parseInt(width);
        this.height = parseInt(height);
        this.thickness = {"x": parseInt(thicknessX), "y": parseInt(thicknessY)};

        this.centerGap = parseInt(centerGap);

        this.wrapper = document.createElement("div");
        this.wrapper.className = "download";

        

        this.canvas = document.createElement("canvas");
        this.canvas.id = `x_${this.width}_${this.height}_${this.thickness.x}_${this.thickness.y}_${this.centerGap}`;
        this.canvas.width = 64;
        this.canvas.height = 64;


        this.wrapper.appendChild(this.canvas);
        this.render();

        this.url = document.createElement("A");
        this.url.download = `${this.canvas.id}.png`;
        this.url.herf = "#";

    
        this.url.innerHTML = "Download";
        this.wrapper.appendChild(this.url);

        _parent.appendChild(this.wrapper);

        this.url.addEventListener("click", () =>{

            _currentDownloaded.push(`x_${this.width}_${this.height}_${this.thickness.x}_${this.thickness.y}_${this.centerGap}`);

            updateIni();
        });

        const image = this.canvas.toDataURL("image/png");

        this.url.href = image;
          
    
    }



    render(){

        const c = this.canvas.getContext("2d");
        c.fillStyle = "black";
        c.fillRect(0,0,64,64);

        c.fillStyle = "white";

        const offsetX = parseInt(_offsetX.value);
        const offsetY = parseInt(_offsetY.value);
        //x
        c.fillRect(32 - this.width - this.centerGap + offsetX, 32 - Math.floor(this.thickness.x * 0.5) + offsetY, this.width, this.thickness.x);
        //c.fillStyle = "red";
        c.fillRect(33 + this.centerGap + offsetX, 32 - Math.floor(this.thickness.x * 0.5) + offsetY, this.width, this.thickness.x);

        
        //y
        c.fillStyle = "white";
        c.fillRect(32 - Math.floor(this.thickness.y * 0.5) + offsetX, 32 - this.height - this.centerGap + offsetY, this.thickness.y, this.height);
       // c.fillStyle = "red";
        c.fillRect(32 - Math.floor(this.thickness.y * 0.5) + offsetX, 33 + this.centerGap + offsetY , this.thickness.y, this.height);


    }

}


//new Crosshair(10,10,1,1,0);
//new Crosshair(10,10,2,2,0);
//new Crosshair(10,10,4,4,0);
//new Crosshair(10,10,8,8,0);

