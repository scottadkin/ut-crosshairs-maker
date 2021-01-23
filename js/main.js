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

const _widthMax = document.getElementById("width-max");
const _heightMax = document.getElementById("height-max");
const _thicknessXMax = document.getElementById("thickness-x-max");
const _thicknessYMax = document.getElementById("thickness-y-max");
const _centerGapMax = document.getElementById("center-gap-max");
const _offsetXMax = document.getElementById("offset-x-max");
const _offsetYMax = document.getElementById("offset-y-max");


let _crosshairs = [];


let _currentDownloaded = [];
let _currentMode = "single";


const updateIni = () =>{

    let string = ``;

    _ini.innerHTML = '';

    for(let i = 0; i < _currentDownloaded.length; i++){

        string += `CrossHairs[${i}]=${_package.value}.${_currentDownloaded[i]}\n`;
    }

    _ini.innerHTML = string;

}

const updateMinMax = (min, max) =>{


    if(parseInt(min.value) > parseInt(max.value)){
        max.value = parseInt(min.value);
        min.value = parseInt(max.value);
    }   
}

const createCrosshairs = () =>{

    const minWidth = parseInt(_width.value);
    const maxWidth = parseInt(_widthMax.value);

    const minHeight = parseInt(_height.value);
    const maxHeight = parseInt(_heightMax.value);

    const minThicknessX = parseInt(_thicknessX.value);
    const maxThicknessX = parseInt(_thicknessXMax.value);

    const minThicknessY = parseInt(_thicknessY.value);
    const maxThicknessY = parseInt(_thicknessYMax.value);

    const minCenterGap = parseInt(_centerGap.value);
    const maxCenterGap = parseInt(_centerGapMax.value);

    const minOffsetX = parseInt(_offsetX.value);
    const maxOffsetX = parseInt(_offsetXMax.value);

    const minOffsetY = parseInt(_offsetY.value);
    const maxOffsetY = parseInt(_offsetYMax.value);

    for(let width = minWidth; width <= maxWidth; width++){
   
        for(let height = minHeight; height <= maxHeight; height++){  

            for(let thicknessX = minThicknessX; thicknessX <= maxThicknessX; thicknessX++){

                for(let thicknessY = minThicknessY; thicknessY <= maxThicknessY; thicknessY++){

                    for(let centerGap = minCenterGap; centerGap <= maxCenterGap; centerGap++){

                        for(let offsetX = minOffsetX; offsetX <= maxOffsetX; offsetX++){

                            for(let offsetY = minOffsetY; offsetY <= maxOffsetY; offsetY++){

                                new Crosshair(width, height, thicknessX, thicknessY, centerGap, offsetX, offsetY);
                            }
                        }
                    }
                }
            }
        }
    }
}

const eventElems = [
    _package,
    _width,
    _height,
    _thicknessX,
    _thicknessY,
    _centerGap,
    _offsetX,
    _offsetY,
    _widthMax,
    _heightMax, 
    _thicknessXMax,
    _thicknessYMax,
    _centerGapMax,
    _offsetXMax,
    _offsetYMax,
];

for(let i = 0; i < eventElems.length; i++){

    eventElems[i].addEventListener("change", () =>{

        

        console.log(eventElems[i].name);

        if(eventElems[i].name === "width" || eventElems[i].name === 'width-max'){
            updateMinMax(_width, _widthMax);
        }else if(eventElems[i].name === "height" || eventElems[i].name === 'height-max'){
            updateMinMax(_height, _heightMax);
        }if(eventElems[i].name === "thickness-x" || eventElems[i].name === 'thickness-x-max'){
            updateMinMax(_thicknessX, _thicknessXMax);
        }if(eventElems[i].name === "thickness-y" || eventElems[i].name === 'thickness-y-max'){
            updateMinMax(_thicknessY, _thicknessYMax);
        }if(eventElems[i].name === "center-gap" || eventElems[i].name === 'center-gap-max'){
            updateMinMax(_centerGap, _centerGapMax);
        }if(eventElems[i].name === "offset-x" || eventElems[i].name === 'offset-x-max'){
            updateMinMax(_offsetX, _offsetXMax);
        }if(eventElems[i].name === "offset-y" || eventElems[i].name === 'offset-y-max'){
            updateMinMax(_offsetY, _offsetYMax);
        }

        _parent.innerHTML = '';
        
        _currentDownloaded = [];
        if(_currentMode === 'single'){
            new Crosshair(_width.value, _height.value, _thicknessX.value, _thicknessY.value, _centerGap.value, _offsetX.value, _offsetY.value);
            updateIni();
        }else{


            createCrosshairs();
            updateIni();
        }
       // for(let i = 0; i < 32; i++){

          //  new Crosshair(i + 1, i + 1, 1, 1, 0, i);
       // }
    });
}


const hideMultiMode = () =>{

    const elems = document.getElementsByClassName("m-mode");

    for(let i = 0; i < elems.length; i++){

        elems[i].style.cssText = "display:none";
    }
}

hideMultiMode();

const showMultiMode = () =>{

    const elems = document.getElementsByClassName("m-mode");

    for(let i = 0; i < elems.length; i++){

        elems[i].style.cssText = "";
    }
}



const test = document.getElementsByName("maker-type");

for(let i = 0; i < test.length; i++){

    test[i].addEventListener("click", () =>{

        console.log(test[i].value);

        _widthMax.value = _width.value,
        _heightMax.value = _height.value; 
        _thicknessXMax.value = _thicknessX.value;
        _thicknessYMax.value = _thicknessY.value;
        _centerGapMax.value = _centerGap.value;
        _offsetXMax.value = _offsetX.value;
        _offsetYMax.value = _offsetY.value;

        if(test[i].value === "single"){
            _currentMode = "single";
            hideMultiMode();
        }else{
            _currentMode = "multi";
            showMultiMode();
        }
    });
}


class Crosshair{

    constructor(width, height, thicknessX, thicknessY, centerGap, offsetX, offsetY){
        
        this.packName = "xhairtests";

        this.width = parseInt(width);
        this.height = parseInt(height);
        this.thickness = {"x": parseInt(thicknessX), "y": parseInt(thicknessY)};

        this.centerGap = parseInt(centerGap);

        this.offset = {"x": parseInt(offsetX), "y": parseInt(offsetY)};

        this.wrapper = document.createElement("div");
        this.wrapper.className = "download";

        

        this.canvas = document.createElement("canvas");
        this.canvas.id = `x_${this.width}_${this.height}_${this.thickness.x}_${this.thickness.y}_${this.centerGap}_${this.offset.x}_${this.offset.y}`;
        this.canvas.width = 64;
        this.canvas.height = 64;


        this.wrapper.appendChild(this.canvas);
        this.render();

        this.url = document.createElement("A");
        this.url.download = `${this.canvas.id}.bmp`;
        this.url.herf = "#";

    
        this.url.innerHTML = "Download";
        this.wrapper.appendChild(this.url);

        _parent.appendChild(this.wrapper);

        this.url.addEventListener("click", () =>{

            const currentName = `x_${this.width}_${this.height}_${this.thickness.x}_${this.thickness.y}_${this.centerGap}_${this.offset.x}_${this.offset.y}`;

            if(_currentDownloaded.indexOf(currentName) === -1){
                _currentDownloaded.push(currentName);
            }

            updateIni();
        });

        const image = this.canvas.toDataURL("image/bmp");

        this.url.href = image;
          
    }



    render(){

        const c = this.canvas.getContext("2d");
        c.fillStyle = "black";
        c.fillRect(0,0,64,64);

        c.fillStyle = "white";

        const offsetX = this.offset.x;
        const offsetY = this.offset.y;
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

new Crosshair(_width.value, _height.value, _thicknessX.value, _thicknessY.value, _centerGap.value, _offsetX.value, _offsetY.value);

