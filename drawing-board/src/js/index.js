class DrawingBoard {
  MODE = 'NONE'; // NONE, BRUSH, ERASER
  isMouseDown = false; // true false
  eraserColor = '#FFFFFF';
  backgroundColor = '#FFFFFF';
  isNavigatorVisible = false;
  undoArray = [];
  containerEl;
  toolbarEl;
  canvasEl;
  brushEl;
  colorPickerEl;
  brushPanelEl;
  brushSliderEl;
  brushSizePreviewEl;
  eraserEl;
  navigatorEl;
  navigatorImageContainerEl;
  navigatorImageEl;
  undoEl;
  clearEl;
  downloadLinkEl;

  constructor() {
    this.assignElement();
    this.initContext();
    this.initCanvasBackground();
    this.addEvent();
  }

  assignElement() {
    this.containerEl = document.getElementById('container');
    this.toolbarEl = this.containerEl.querySelector('#toolbar');
    this.canvasEl = this.containerEl.querySelector('#canvas');
    this.brushEl = this.toolbarEl.querySelector('#brush');
    this.colorPickerEl = this.toolbarEl.querySelector('#colorPicker');
    this.brushPanelEl = this.containerEl.querySelector('#brushPanel');
    this.brushSliderEl = this.brushPanelEl.querySelector('#brushSize');
    this.brushSizePreviewEl =
      this.brushPanelEl.querySelector('#brushSizePreview');
    this.eraserEl = this.toolbarEl.querySelector('#eraser');
    this.navigatorEl = this.toolbarEl.querySelector('#navigator');
    this.navigatorImageContainerEl = this.containerEl.querySelector('#imgNav');
    this.navigatorImageEl =
      this.navigatorImageContainerEl.querySelector('#canvasImg');
    this.undoEl = this.toolbarEl.querySelector('#undo');
    this.clearEl = this.toolbarEl.querySelector('#clear');
    this.downloadLinkEl = this.toolbarEl.querySelector('#download');
  }

  initContext() {
    this.context = this.canvasEl.getContext('2d');
  }

  initCanvasBackground() {
    this.context.fillStyle = this.backgroundColor;
    this.context.fillRect(0, 0, this.canvasEl.width, this.canvasEl.height);
  }

  addEvent() {
    this.brushEl.addEventListener('click', this.onClickBrush.bind(this));
    this.canvasEl.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.canvasEl.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.canvasEl.addEventListener('mouseup', this.onMouseUp.bind(this));
    this.brushSliderEl.addEventListener(
      'input',
      this.onChangeBrushSize.bind(this),
    );
    this.colorPickerEl.addEventListener('input', this.onChangeColor.bind(this));
    this.canvasEl.addEventListener('mouseout', this.onMouseOut.bind(this));
    this.eraserEl.addEventListener('click', this.onClickEraser.bind(this));
    this.navigatorEl.addEventListener(
      'click',
      this.onClickNavigator.bind(this),
    );
    this.undoEl.addEventListener('click', this.onClickUndo.bind(this));
    this.clearEl.addEventListener('click', this.onClickClear.bind(this));
    this.downloadLinkEl.addEventListener(
      'click',
      this.onClickDownload.bind(this),
    );
  }

  onClickDownload() {
    //this.downloadLinkEl이 a태그이므로
    this.downloadLinkEl.href = this.canvasEl.toDataURL('image/jpeg', 1); //dataURL을 jpeg 파일로 변환해줌
    this.downloadLinkEl.download = 'example.jpeg'; //어떤 파일명으로 다운로드 받을 것인지 정해줌
  }

  onClickClear() {
    this.context.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height); //canvas 전체 지워줌
    this.undoArray = []; //상태 배열도 초기화
    this.updateNavigator(); //navigator도 업데이트 해줌
    this.initCanvasBackground(); //canvas의 초기 상태를 설정 해줌
  }

  onClickUndo() {
    if (this.undoArray.length === 0) {
      alert('더이상 실행취소 불가합니다!');
      return;
    }
    let previousDataUrl = this.undoArray.pop(); //가장 최근의 상태 가져오기
    let previousImage = new Image();
    previousImage.onload = () => {
      //img가 load된 시점에 실행할 함수
      this.context.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height); //canvas clear 해줌
      this.context.drawImage(
        previousImage,
        0,
        0,
        this.canvasEl.width,
        this.canvasEl.height, //image의 크기
        0,
        0,
        this.canvasEl.width,
        this.canvasEl.height, //image를 넣은 canvas의 크기
      );
    };
    previousImage.src = previousDataUrl;
  }

  saveState() {
    if (this.undoArray.length > 4) {
      this.undoArray.shift(); //제일 오래된 상태를 빼줌
      this.undoArray.push(this.canvasEl.toDataURL());
    } else {
      this.undoArray.push(this.canvasEl.toDataURL());
    }
    //현재의 canvas 상태를 dataURL로 converting 한 것을 배열에 저장
    //최근 5개까지만 저장하도록
    //mousedown시 실행
  }

  onClickNavigator(event) {
    this.isNavigatorVisible = !event.currentTarget.classList.contains('active');
    event.currentTarget.classList.toggle('active');
    this.navigatorImageContainerEl.classList.toggle('hide');
    this.updateNavigator();
  }

  updateNavigator() {
    if (!this.isNavigatorVisible) return;
    //navigator가 보일 때만 img src를 업데이트하고, 안 보이는 상태에서는 업데이트 하지 않다가 보이는 순간 업데이트 해줌
    this.navigatorImageEl.src = this.canvasEl.toDataURL();
  }

  onClickEraser(event) {
    const isActive = event.currentTarget.classList.contains('active');
    this.MODE = isActive ? 'NONE' : 'ERASER';
    this.canvasEl.style.cursor = isActive ? 'default' : 'crosshair';
    this.brushPanelEl.classList.add('hide');
    event.currentTarget.classList.toggle('active');
    this.brushEl.classList.remove('active');
  }

  onMouseOut() {
    if (this.MODE === 'NONE') return;
    this.isMouseDown = false;
    this.updateNavigator();
  }

  onChangeColor(event) {
    this.brushSizePreviewEl.style.background = event.target.value;
  }

  onChangeBrushSize(event) {
    this.brushSizePreviewEl.style.width = `${event.target.value}px`;
    this.brushSizePreviewEl.style.height = `${event.target.value}px`;
  }

  onMouseDown(event) {
    if (this.MODE === 'NONE') return;
    this.isMouseDown = true;
    const currentPosition = this.getMousePosition(event); // canvas 기준으로 mousedown된 위치
    this.context.beginPath();
    this.context.moveTo(currentPosition.x, currentPosition.y);
    this.context.lineCap = 'round';
    if (this.MODE === 'BRUSH') {
      this.context.strokeStyle = this.colorPickerEl.value;
      this.context.lineWidth = this.brushSliderEl.value;
    } else if (this.MODE === 'ERASER') {
      this.context.strokeStyle = this.eraserColor;
      this.context.lineWidth = 50;
    }
    this.saveState();
  }

  onMouseMove(event) {
    if (!this.isMouseDown) return;
    const currentPosition = this.getMousePosition(event);
    this.context.lineTo(currentPosition.x, currentPosition.y);
    this.context.stroke();
    //mousedown한 상태일 때만 그려지도록 함
    //마우스를 움직이면서 현재 움직이고 있는 위치의 좌표를 구해서 그 지점까지 그려주도록 함
  }

  onMouseUp() {
    if (this.MODE === 'NONE') return;
    this.isMouseDown = false;
    this.updateNavigator();
  }

  getMousePosition(event) {
    const boundaries = this.canvasEl.getBoundingClientRect();
    return {
      x: event.clientX - boundaries.left,
      y: event.clientY - boundaries.top,
    };
  }

  onClickBrush(event) {
    const isActive = event.currentTarget.classList.contains('active');
    this.MODE = isActive ? 'NONE' : 'BRUSH';
    this.canvasEl.style.cursor = isActive ? 'default' : 'crosshair';
    this.brushPanelEl.classList.toggle('hide');
    event.currentTarget.classList.toggle('active');
    this.eraserEl.classList.remove('active');
  }
}

new DrawingBoard();
